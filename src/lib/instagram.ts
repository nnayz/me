/**
 * Instagram API Utility
 * 
 * Fetches posts from the Instagram Graph API.
 * 
 * Required environment variables:
 * - VITE_INSTAGRAM_USER_ID: Your Instagram User ID
 * - VITE_INSTAGRAM_ACCESS_TOKEN: Long-lived access token
 * 
 * Note: For production, consider using a serverless function 
 * to avoid exposing the access token in client-side code.
 */

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO';
  media_url: string;
  thumbnail_url?: string; // For videos
  permalink: string;
  timestamp: string;
  children?: {
    data: InstagramMedia[];
  };
  carouselInfo?: {
    parentId: string;
    currentIndex: number;
    totalImages: number;
    allImages: string[];
  };
}

export interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO';
  media_url: string;
}

export interface InstagramFeedResponse {
  posts: InstagramPost[];
  error?: string;
}

export interface InstagramProfile {
  id: string;
  username: string;
  account_type?: string;
  media_count?: number;
}

export interface InstagramProfileResponse {
  profile: InstagramProfile | null;
  error?: string;
}


const INSTAGRAM_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;
const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

/**
 * Fetch Instagram posts from the Graph API
 * 
 * @param limit - Number of posts to fetch (default: 25)
 */
export async function fetchInstagramPosts(limit: number = 25): Promise<InstagramFeedResponse> {
  if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
    console.warn('Instagram API credentials not configured');
    return { 
      posts: [], 
      error: 'Instagram not configured. Add VITE_INSTAGRAM_USER_ID and VITE_INSTAGRAM_ACCESS_TOKEN to your environment.' 
    };
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{id,media_type,media_url}';
    const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=${fields}&limit=${limit}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram API error:', errorData);
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter out videos/reels, keep only images and carousels
    const posts = (data.data || []).filter(
      (post: InstagramPost) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
    );
    
    return { posts };
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return { 
      posts: [], 
      error: error instanceof Error ? error.message : 'Failed to load Instagram feed' 
    };
  }
}

/**
 * Format timestamp to relative or absolute date
 */
export function formatPostDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  });
}

/**
 * Expand carousel posts into individual image posts
 * Returns an array of posts where carousel albums are expanded into multiple posts
 */
export function expandCarouselPosts(posts: InstagramPost[]): InstagramPost[] {
  const expanded: InstagramPost[] = [];
  
  for (const post of posts) {
    if (post.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
      // Filter only images from carousel
      const imageChildren = post.children.data.filter(
        (child) => child.media_type === 'IMAGE'
      );
      
      // Create a post for each image in the carousel
      imageChildren.forEach((child, index) => {
        expanded.push({
          ...post,
          id: `${post.id}_${child.id}`, // Unique ID for each carousel image
          media_type: 'IMAGE',
          media_url: child.media_url,
          // Store carousel info for lightbox navigation
          carouselInfo: {
            parentId: post.id,
            currentIndex: index,
            totalImages: imageChildren.length,
            allImages: imageChildren.map(c => c.media_url),
          },
        });
      });
    } else {
      // Regular single image post
      expanded.push(post);
    }
  }
  
  return expanded;
}

/**
 * Fetch Instagram profile information
 * 
 * Returns profile data including username and profile picture
 */
export async function fetchInstagramProfile(): Promise<InstagramProfileResponse> {
  if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
    console.warn('Instagram API credentials not configured');
    return { 
      profile: null,
      error: 'Instagram not configured. Add VITE_INSTAGRAM_USER_ID and VITE_INSTAGRAM_ACCESS_TOKEN to your environment.' 
    };
  }

  try {
    const fields = 'id,username,account_type,media_count';
    const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram Profile API error:', errorData);
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return { 
      profile: {
        ...data,
      }
    };
  } catch (error) {
    console.error('Instagram profile fetch error:', error);
    return { 
      profile: null,
      error: error instanceof Error ? error.message : 'Failed to load Instagram profile' 
    };
  }
}

/**
 * Refresh long-lived access token
 * 
 * Long-lived tokens are valid for 60 days.
 * Call this endpoint before the token expires to get a new one.
 * 
 * In production, set up a cron job or scheduled function to refresh automatically.
 */
export async function refreshAccessToken(): Promise<{ access_token: string; expires_in: number } | null> {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    console.error('No access token to refresh');
    return null;
  }

  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Token refreshed. New expiry:', data.expires_in, 'seconds');
    
    return data;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}
