db.createUser(
        {
            user: "stockservice",
            pwd: "stockservice123456",
            roles: [
                {
                    role: "readWrite",
                    db: "stockdb"
                }
            ]
        }
);

db.stocks.insert({
	product: ObjectId("619e322beb27f27d156c30ba"),
        count : NumberInt(100),
	createdAt: ISODate(),
	updatedAt: ISODate()
});

db.stocks.insert({
	product: ObjectId("619e322beb27f27d156c31ba"),
        count : NumberInt(50),
	createdAt: ISODate(),
	updatedAt: ISODate()
});



