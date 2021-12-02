db.createUser(
        {
            user: "orderservice",
            pwd: "orderservice123456",
            roles: [
                {
                    role: "readWrite",
                    db: "orderdb"
                }
            ]
        }
);

db.orders.insert({
	_id: ObjectId("619e3c02829fdee25f0268d0"),
	client: ObjectId("619e3c02829fdee25f0268c1"),
        basket: {
            products: [
                {
                    product: ObjectId("619e322beb27f27d156c30ba"),
                    count : NumberInt(2)
                },
                {
                    product: ObjectId("619e322beb27f27d156c31ba"),
                    count : NumberInt(3)
                }
            ], 
        },
        status: NumberInt(500),
	createdAt: ISODate(),
	updatedAt: ISODate()
});
