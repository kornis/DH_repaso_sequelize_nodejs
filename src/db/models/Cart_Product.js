

module.exports = (sequelize, DataTypes) => {
    const CartProduct = sequelize.define('cartProduct', {
        cant: DataTypes.INTEGER,
        id_cart: DataTypes.BIGINT,
        id_product: DataTypes.BIGINT
    },
    {
        tableName: 'cart_product',
        timestamps: false
    }
    )

    return CartProduct;
}