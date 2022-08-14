Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed tx...")
    if (confirmed) {
        logger.info("Found item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const activeItem = new ActiveItem()
        activeItem.set("markteplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokeId"))
        activeItem.set("seller", request.object.get("seller"))
        logger.info(
            `Adding Address: ${request.object.get("address")}. TokenId: ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})
