DELETE FROM feed 
WHERE feed.id 
IN (SELECT feed.id FROM feed 
    LEFT JOIN feed_mark 
    ON feed.id = feed_mark."feedId" 
    WHERE feed_mark.id IS NULL
	AND feed."createdAt" < '2019-05-01'
);
