export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_buses: {
        Row: {
          arrival_time: string
          bus_type: string
          contact: string | null
          created_at: string
          departure_time: string
          from_city: string
          id: string
          operator: string
          price: number
          to_city: string
          total_seats: number
        }
        Insert: {
          arrival_time: string
          bus_type?: string
          contact?: string | null
          created_at?: string
          departure_time: string
          from_city: string
          id?: string
          operator: string
          price: number
          to_city: string
          total_seats?: number
        }
        Update: {
          arrival_time?: string
          bus_type?: string
          contact?: string | null
          created_at?: string
          departure_time?: string
          from_city?: string
          id?: string
          operator?: string
          price?: number
          to_city?: string
          total_seats?: number
        }
        Relationships: []
      }
      admin_hotels: {
        Row: {
          amenities: string | null
          city: string
          contact: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_night: number
          rating: number
        }
        Insert: {
          amenities?: string | null
          city: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_night: number
          rating?: number
        }
        Update: {
          amenities?: string | null
          city?: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_night?: number
          rating?: number
        }
        Relationships: []
      }
      admin_lodges: {
        Row: {
          amenities: string | null
          city: string
          contact: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_night: number
          rating: number
        }
        Insert: {
          amenities?: string | null
          city: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_night: number
          rating?: number
        }
        Update: {
          amenities?: string | null
          city?: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_night?: number
          rating?: number
        }
        Relationships: []
      }
      bookings: {
        Row: {
          amount_inr: number
          booking_type: string
          city: string
          created_at: string
          email: string | null
          id: string
          id_proof: string | null
          item_name: string
          notes: string | null
          payment_method: string | null
          phone: string | null
          service_id: string | null
          status: string
          travel_date: string
          traveler_name: string | null
          travelers: number
          user_id: string
        }
        Insert: {
          amount_inr: number
          booking_type: string
          city: string
          created_at?: string
          email?: string | null
          id?: string
          id_proof?: string | null
          item_name: string
          notes?: string | null
          payment_method?: string | null
          phone?: string | null
          service_id?: string | null
          status?: string
          travel_date: string
          traveler_name?: string | null
          travelers?: number
          user_id: string
        }
        Update: {
          amount_inr?: number
          booking_type?: string
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          id_proof?: string | null
          item_name?: string
          notes?: string | null
          payment_method?: string | null
          phone?: string | null
          service_id?: string | null
          status?: string
          travel_date?: string
          traveler_name?: string | null
          travelers?: number
          user_id?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          caption: string
          city: string
          created_at: string
          id: string
          media_type: string | null
          media_url: string | null
          rating: number | null
          user_id: string
        }
        Insert: {
          caption: string
          city: string
          created_at?: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          rating?: number | null
          user_id: string
        }
        Update: {
          caption?: string
          city?: string
          created_at?: string
          id?: string
          media_type?: string | null
          media_url?: string | null
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      guardians: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          user_id?: string
        }
        Relationships: []
      }
      guide_applications: {
        Row: {
          bio: string
          city: string
          contact_phone: string
          created_at: string
          experience_years: number
          full_name: string
          id: string
          languages: string
          reviewed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          bio: string
          city: string
          contact_phone: string
          created_at?: string
          experience_years?: number
          full_name: string
          id?: string
          languages: string
          reviewed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          bio?: string
          city?: string
          contact_phone?: string
          created_at?: string
          experience_years?: number
          full_name?: string
          id?: string
          languages?: string
          reviewed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      hot_plans: {
        Row: {
          budget_inr: number
          climate: string
          cover_image: string | null
          created_at: string
          days_count: number
          id: string
          interests: string
          plan_data: Json
          popularity: number
          rating: number
          summary: string
          title: string
          total_cost_inr: number
        }
        Insert: {
          budget_inr?: number
          climate?: string
          cover_image?: string | null
          created_at?: string
          days_count?: number
          id?: string
          interests?: string
          plan_data: Json
          popularity?: number
          rating?: number
          summary: string
          title: string
          total_cost_inr?: number
        }
        Update: {
          budget_inr?: number
          climate?: string
          cover_image?: string | null
          created_at?: string
          days_count?: number
          id?: string
          interests?: string
          plan_data?: Json
          popularity?: number
          rating?: number
          summary?: string
          title?: string
          total_cost_inr?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trip_plans: {
        Row: {
          budget_inr: number | null
          climate: string | null
          confirmed: boolean
          created_at: string
          days_count: number
          id: string
          interests: string | null
          plan_data: Json
          source_hot_plan_id: string | null
          start_city: string | null
          summary: string
          title: string
          total_cost_inr: number
          user_id: string
        }
        Insert: {
          budget_inr?: number | null
          climate?: string | null
          confirmed?: boolean
          created_at?: string
          days_count?: number
          id?: string
          interests?: string | null
          plan_data: Json
          source_hot_plan_id?: string | null
          start_city?: string | null
          summary: string
          title: string
          total_cost_inr?: number
          user_id: string
        }
        Update: {
          budget_inr?: number | null
          climate?: string | null
          confirmed?: boolean
          created_at?: string
          days_count?: number
          id?: string
          interests?: string | null
          plan_data?: Json
          source_hot_plan_id?: string | null
          start_city?: string | null
          summary?: string
          title?: string
          total_cost_inr?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_plans_source_hot_plan_id_fkey"
            columns: ["source_hot_plan_id"]
            isOneToOne: false
            referencedRelation: "hot_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_reviews: {
        Row: {
          city: string | null
          comment: string
          created_at: string
          id: string
          rating: number
          service_name: string
          service_type: string
          user_id: string
        }
        Insert: {
          city?: string | null
          comment: string
          created_at?: string
          id?: string
          rating: number
          service_name: string
          service_type: string
          user_id: string
        }
        Update: {
          city?: string | null
          comment?: string
          created_at?: string
          id?: string
          rating?: number
          service_name?: string
          service_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "tourist" | "guide" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["tourist", "guide", "admin"],
    },
  },
} as const
