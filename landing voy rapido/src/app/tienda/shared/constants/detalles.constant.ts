import { Columns } from "../../../shared/interfaces/columns.interface";
export const DetallesColumns: Columns = {
    columns: [
        ["Nombre", "deliveryName"],
        ["Teléfono", "deliveryPhone"],
        ["Comuna", "deliveryCommuna"],
        ["Precio", "price"],
        ["Dirección", "deliveryAddress"],
        ["", "opciones"],
    ],
    columnsSelect: ["deliveryName", "deliveryPhone", "deliveryCommuna", "price", "deliveryAddress", "opciones"],
    displayedColumns: ["deliveryName", "deliveryPhone", "deliveryCommuna", "price", "deliveryAddress", "opciones"],
    480: ["deliveryName", "opciones"],
    680: ["deliveryName", "deliveryPhone", "deliveryCommuna", "opciones"],
    768: ["deliveryName", "deliveryPhone", "deliveryCommuna", "price", "opciones"],
    1024: ["deliveryName", "deliveryPhone", "deliveryCommuna", "price", "deliveryAddress", "opciones"],
};