db.createUser(
        {
            user: "stockmovementservice",
            pwd: "stockmovementservice123456",
            roles: [
                {
                    role: "readWrite",
                    db: "stockmovementdb"
                }
            ]
        }
);

db.stockmovements.drop();
