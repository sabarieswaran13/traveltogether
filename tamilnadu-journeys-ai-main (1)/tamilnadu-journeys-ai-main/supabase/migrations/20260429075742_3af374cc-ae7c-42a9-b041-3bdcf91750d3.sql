-- Update handle_new_user to support role selection from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  requested_role text;
  admin_code text;
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));

  -- Every new user is a tourist by default
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'tourist')
  ON CONFLICT DO NOTHING;

  requested_role := NEW.raw_user_meta_data->>'requested_role';
  admin_code := NEW.raw_user_meta_data->>'admin_code';

  -- Guide signup -> create guide role immediately (tourist also kept)
  IF requested_role = 'guide' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'guide')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Admin signup -> requires admin code 1313
  IF requested_role = 'admin' AND admin_code = '1313' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Always grant admin to the designated main admin email
  IF lower(NEW.email) = 'sapariee703@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;