import { useEffect, useRef, useState } from "react";
import { ItemDTO } from "../models/item.model";
import { validationItemFormModel } from "../utils/validationForm";
import { CreateItemAsync } from "../services/itemService";
import { useAuthStore } from "../../../store/store";
import { AuthUser } from "../../auth/models/auth.model";
import { jwtDecoder } from "../../../utils/jwtDecoder";

export function ItemRegisterForm(){
    const formRef = useRef<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const jwt = useAuthStore(state => state.jwt);
    const [user, setUser] = useState<AuthUser>({ id: 0, username: '', role: '' });
    const [formValue, setFormValue] = useState<ItemDTO>({
        name: '',
        alias: '',
        description: '',
        model: '',
        price: 0,
        wholesalePrice: 0,
        barePrice: 0,
        brandID: 0,
        subCategoryID: 0,
        weight: 0,
        dateManufacture: '',
        itemAddressID: 0,
        userID: 0,
        pathItems: [],
        branchOfficeID: 0,
        quantity: 0,
        acronym: ''
    });

    const model = validationItemFormModel;

    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };

    const handleSearch = (value: string) => {
        setSearchLoading(true);
        setSearchTerm(value);
       
        setTimeout(() => {
            setSearchLoading(false);
        }, 500); 
    };

    useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
      }, [formValue]);

    useEffect(() => {
         if (jwt) {
            let decode = jwtDecoder(jwt);
            setUser({
                id: decode.id,
                username: decode.sub,
                role: decode.role
            })

            formValue.userID = user.id;
        } else {
              console.error("User authentication token is null");
        }
    }, [formValue]);

        const handleSubmit = async (onSuccess?: () => void) => {
            if (!formRef.current) return false;
            try {
                const isValid = await formRef.current.check();
                if (isValid) {
                    // const res = await CreateItemAsync(formValue);
                    // if (res !== null) {
                    //     resetForm();
                    //     if (onSuccess) onSuccess();
                    //     return true;
                    // }
                }
            } catch (error) {
                console.error('Fallo en la validacion del Formulario: ', error);
            }
            return false;
        };
    
    function resetForm() {
        if (formRef.current) { 
            formRef.current.reset(); 
        } 
        setFormValue({ 
            name: '',
            alias: '',
            description: '',
            model: '',
            price: 0,
            wholesalePrice: 0,
            barePrice: 0,
            brandID: 0,
            subCategoryID: 0,
            weight: 0,
            dateManufacture: '',
            itemAddressID: 0,
            userID: 0,
            pathItems: [],
            branchOfficeID: 0,
            quantity: 0,
            acronym: ''
        });
    };

    function handleInputChange(field: keyof ItemDTO, value: any) {
        console.log("Campo actualizado:", field, "Valor:", value);
        setFormValue((prevValues) => ({
                ...prevValues,
                [field]: value,
            }));
    };

    function handleModal(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        formValue,
        handleInputChange,
        handleModal,
        showModal,
        formRef,
        model,
        handleSubmit,
        handleChangeLimit,
        handleSearch,
        searchLoading,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        isMobile,
    };
}
