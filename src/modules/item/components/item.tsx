import {Loader, Stack, IconButton, Table, Whisper, Tooltip} from "rsuite";
import { FetchDataAsync } from "../services/itemService";
import PlusIcon from '@rsuite/icons/Plus';
import {FaEdit, FaTrash} from "react-icons/fa";
import { GetItems } from "../models/item.model";
import { ItemRegisterForm } from "../hooks/useItemForm";
import ItemForm from "./item_form";

const { Column, HeaderCell, Cell } = Table;

const urlFetchItem = "/items/getAllItems";


export default function Item() {
    const { data, loading } = FetchDataAsync<GetItems[]>(urlFetchItem);
    
    const {handleModal, showModal} = ItemRegisterForm();

    if (loading) {
        return (
            <><Loader content="Cargando registros..." vertical /></>
        );
    }

    // if (error) {
    //     return (
    //         <><Text color="red">Ups! Ocurrio un error: {error.message}</Text></>
    //     );
    // }

    return (
        <>
                <Stack spacing={2} justifyContent="space-between">
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModal(true)}
                    >
                        Nuevo Repuesto
                    </IconButton>
                </Stack>
                {data && data.length > 0 ? (
                    <Table height={400} data={data}>
                        <Column width={80} fixed="right">
                            <HeaderCell>...</HeaderCell>
                            <Cell>
                                <Stack
                                    spacing={6}
                                    justifyContent="center"
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Whisper
                                        placement="top"
                                        trigger="hover"
                                        speaker={<Tooltip>Editar</Tooltip>}
                                    >
                                        <IconButton
                                            icon={<FaEdit />}
                                            style={{ width: 50, margin: 3 }}
                                            appearance="primary"
                                        />
                                    </Whisper>
                                    <Whisper
                                        placement="top"
                                        trigger="hover"
                                        speaker={<Tooltip>Eliminar</Tooltip>}
                                    >
                                        <IconButton
                                            icon={<FaTrash />}
                                            style={{ width: 50, margin: 3 }}
                                            appearance="primary"
                                        />
                                    </Whisper>
                                </Stack>
                            </Cell>
                        </Column>
                        <Column width={150}>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="firstName" />
                        </Column>
                        <Column width={150}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="lastName" />
                        </Column>
                    </Table>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        Sin registros
                    </div>
                )}
                <ItemForm open={showModal} hiddeModal={() => handleModal(false)} />
        </>
    );    
}