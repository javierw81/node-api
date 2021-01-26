// eslint-disable-next-line no-undef
db.createUser(
    {
        user: "dev",
        pwd: "dev",
        roles: [
            {
                role: "readWrite",
                db: "nodeapi"
            }
        ]
    }
);