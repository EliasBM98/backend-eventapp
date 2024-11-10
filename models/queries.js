const events = {
    getAllEvents:
    `SELECT 	events.*, 
		        event_phase.name AS Phase, 
		        event_type.name AS Type, 
		        enterprise.name AS Enterprise, 
		        users.name AS Chief
    FROM events
    JOIN event_phase ON events.event_phase = event_phase.id
    JOIN event_type ON events.event_type = event_type.id
    JOIN enterprise ON events.enterprise = enterprise.id
    JOIN users ON events.chief = users.id
    ORDER BY events.name`,

    getEventsByName:
    `SELECT 	events.*, 
		        event_phase.name AS Phase, 
		        event_type.name AS Type, 
		        enterprise.name AS Enterprise, 
		        users.name AS Chief
    FROM events
    JOIN event_phase ON events.event_phase = event_phase.id
    JOIN event_type ON events.event_type = event_type.id
    JOIN enterprise ON events.enterprise = enterprise.id
    JOIN users ON events.chief = users.id
    WHERE events.name ILIKE '%' || $1 || '%'
    ORDER BY events.name`,

    createEvents:
    `INSERT INTO events (name, 
					    description, 
					    year, 
					    start_date, 
					    end_date, 
					    event_phase, 
					    event_type, 
					    enterprise,
					    chief)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,

    deleteEvents:`
    DELETE FROM events
    WHERE id=$1  
    RETURNING *`,

    editEvents:
    `    UPDATE events
        SET 
            name='$1', 
            description='$2', 
            year='$3', 
            start_date='$4', 
            end_date='$5', 
            event_phase='$6', 
            event_type='$7', 
            enterprise='$8',
            chief='$9'
	WHERE id='$1'
    RETURNING *`,

}


module.exports={
    events
}