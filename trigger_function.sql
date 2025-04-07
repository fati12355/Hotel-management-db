CREATE OR REPLACE FUNCTION prevent_hotel_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    reservation_count INT;
BEGIN
    -- Vérifier si l'hôtel a encore des réservations actives (liées aux chambres)
    SELECT COUNT(*) INTO reservation_count 
    FROM reservation r
    JOIN room rm ON r.room_id = rm.room_id
    WHERE rm.hotel_id = OLD.hotel_id;

    -- Si des réservations existent, empêcher la suppression
    IF reservation_count > 0 THEN
        RAISE EXCEPTION '❌ Impossible de supprimer l’hôtel : des réservations existent encore.';
    END IF;

    RETURN OLD; -- Permet la suppression si aucune réservation n’existe
END;
$$;

-- Supprimer l'ancien trigger avant d'en créer un nouveau
DROP TRIGGER IF EXISTS trigger_prevent_hotel_delete ON hotel;

-- Créer un nouveau trigger pour empêcher la suppression d'un hôtel s'il reste des réservations
CREATE TRIGGER trigger_prevent_hotel_delete
BEFORE DELETE ON hotel
FOR EACH ROW 
EXECUTE FUNCTION prevent_hotel_delete();




