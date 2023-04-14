import { reject } from "lodash";
import { Widgets } from "./dbConnectors"; 

export const resolvers = {  
    getProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.findById({ _id: id}, (err, product) => {
                if (err) reject(err)
                else resolve(product)
            })
        });
    },
    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name, 
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });

        return newWidget.save()
        .then((savedWidget) => {
            savedWidget.id = savedWidget._id;
            return savedWidget;
        })
        .catch((err) => {
            throw new Error(`Failed to create new widget: ${err.message}`);
        });
    },
    updateProduct: ({ input }) => {
        return Widgets.findByIdAndUpdate({ _id: input.id}, input, { new: true })
        .then((widget) => {
            return widget;
        })
        .catch((err) => {
            throw new Error(`Failed to update widget: ${err.message}`);
        });
    }, 
    deleteProduct: ({ id }) => {
        return Widgets.deleteOne({ _id: id })
        .then(() => {
            return "Successfully deleted widget";
        })
        .catch((err) => {
            throw new Error(`Failed to delete widget: ${err.message}`)
        });
    }    
}; 

export default resolvers;