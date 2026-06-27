export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          display_order: number | null;
          icon: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      districts: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          region_id: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          region_id: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          region_id?: string;
          slug?: string;
        };
      };
      foods: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      hotel_details: {
        Row: {
          amenities: Json | null;
          booking_url: string | null;
          check_in_time: string | null;
          check_out_time: string | null;
          created_at: string;
          currency: string | null;
          hotel_type: string;
          place_id: string;
          price_per_night_max: number | null;
          price_per_night_min: number | null;
          star_rating: number | null;
          total_rooms: number | null;
          updated_at: string;
        };
        Insert: {
          amenities?: Json | null;
          booking_url?: string | null;
          check_in_time?: string | null;
          check_out_time?: string | null;
          created_at?: string;
          currency?: string | null;
          hotel_type: string;
          place_id: string;
          price_per_night_max?: number | null;
          price_per_night_min?: number | null;
          star_rating?: number | null;
          total_rooms?: number | null;
          updated_at?: string;
        };
        Update: {
          amenities?: Json | null;
          booking_url?: string | null;
          check_in_time?: string | null;
          check_out_time?: string | null;
          created_at?: string;
          currency?: string | null;
          hotel_type?: string;
          place_id?: string;
          price_per_night_max?: number | null;
          price_per_night_min?: number | null;
          star_rating?: number | null;
          total_rooms?: number | null;
          updated_at?: string;
        };
      };
      places: {
        Row: {
          address: string | null;
          avg_rating: number | null;
          category_id: string;
          cover_image_url: string | null;
          created_at: string;
          description: string | null;
          district_id: string;
          email: string | null;
          id: string;
          is_active: boolean | null;
          is_verified: boolean | null;
          latitude: number | null;
          longitude: number | null;
          location: unknown;
          metadata: Json | null;
          name: string;
          phone: string | null;
          price_level: number | null;
          review_count: number | null;
          slug: string;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          avg_rating?: number | null;
          category_id: string;
          cover_image_url?: string | null;
          created_at?: string;
          description?: string | null;
          district_id: string;
          email?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          location?: unknown;
          metadata?: Json | null;
          name: string;
          phone?: string | null;
          price_level?: number | null;
          review_count?: number | null;
          slug: string;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          avg_rating?: number | null;
          category_id?: string;
          cover_image_url?: string | null;
          created_at?: string;
          description?: string | null;
          district_id?: string;
          email?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          location?: unknown;
          metadata?: Json | null;
          name?: string;
          phone?: string | null;
          price_level?: number | null;
          review_count?: number | null;
          slug?: string;
          updated_at?: string;
          website?: string | null;
        };
      };
      restaurant_details: {
        Row: {
          avg_cost_for_two: number | null;
          created_at: string;
          cuisine_types: string[] | null;
          currency: string | null;
          dietary_options: string[] | null;
          has_delivery: boolean | null;
          has_dine_in: boolean | null;
          has_takeout: boolean | null;
          place_id: string;
          reservation_url: string | null;
          updated_at: string;
        };
        Insert: {
          avg_cost_for_two?: number | null;
          created_at?: string;
          cuisine_types?: string[] | null;
          currency?: string | null;
          dietary_options?: string[] | null;
          has_delivery?: boolean | null;
          has_dine_in?: boolean | null;
          has_takeout?: boolean | null;
          place_id: string;
          reservation_url?: string | null;
          updated_at?: string;
        };
        Update: {
          avg_cost_for_two?: number | null;
          created_at?: string;
          cuisine_types?: string[] | null;
          currency?: string | null;
          dietary_options?: string[] | null;
          has_delivery?: boolean | null;
          has_dine_in?: boolean | null;
          has_takeout?: boolean | null;
          place_id?: string;
          reservation_url?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type PlaceRecord = Database["public"]["Tables"]["places"]["Row"];
export type HotelRecord = Database["public"]["Tables"]["hotel_details"]["Row"];
export type RestaurantRecord = Database["public"]["Tables"]["restaurant_details"]["Row"];
export type LocalFoodRecord = Database["public"]["Tables"]["foods"]["Row"];
