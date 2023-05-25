import React from "react";
import { Item } from './Item';

export const ItemsList = ({items}) => {
    return <>
        {
            items.map((item, index) => {
                return <Item item={item} key={index}/>
            })
        }
    </>
}
