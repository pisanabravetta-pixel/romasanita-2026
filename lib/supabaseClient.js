import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mkmyadztjcnebrhuzdka.supabase.co'
const supabaseAnonKey = 'sb_publishable_HetGXnk4p_KXZNOlCAmf3w_SW2iJ_ya'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
