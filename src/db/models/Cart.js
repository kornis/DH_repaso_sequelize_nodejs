module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: DataTypes.BIGINT,
        status: DataTypes.BOOLEAN
    },
    {
        tableName: 'cart',
        timestamps: false
    })

    Cart.associate = models => {
        Cart.belongsToMany(models.products, {
            foreignKey: "id_cart",
            otherKey: 'id_product',
            through: models.cartProduct
        }),

        Cart.belongsTo(models.users, {
            foreignKey: "id_user"
        })
    }

    return Cart;
}