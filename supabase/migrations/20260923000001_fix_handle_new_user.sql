-- Fix handle_new_user function to set search_path and handle conflicts / nulls robustly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        new.id,
        COALESCE(new.email, ''),
        COALESCE(
            new.raw_user_meta_data->>'full_name',
            new.raw_user_meta_data->>'name',
            split_part(COALESCE(new.email, ''), '@', 1)
        ),
        COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
        'student'::public.user_role
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = CASE 
            WHEN EXCLUDED.avatar_url IS NOT NULL AND EXCLUDED.avatar_url <> '' 
            THEN EXCLUDED.avatar_url 
            ELSE public.profiles.avatar_url 
        END,
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log warning and do not block Supabase Auth user creation
        RAISE WARNING 'handle_new_user exception: %', SQLERRM;
        RETURN NEW;
END;
$$;
