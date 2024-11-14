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
    ORDER BY events.name
    LIMIT 2
    OFFSET 2*$1`,

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

    editEvents:`
    UPDATE events
    SET name=$2,
        description=$3, 
		year=$4, 
	    start_date=$5, 
		end_date=$6, 
		event_phase=$7, 
		event_type=$8, 
		enterprise=$9,
		chief=$10         
	WHERE id=$1
    RETURNING *`,

}


module.exports={
    events
}