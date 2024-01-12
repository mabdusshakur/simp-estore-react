import { useParams } from 'react-router-dom';

function EditCategoryComponent() {
    const { id } = useParams();

    return ( 
        <>
            <h1>Edit Category for {id}</h1>
        </>
     );
}

export default EditCategoryComponent;