import React, { useEffect, useState } from 'react'
import projectApi from '../../../services/projectApi';
import ProjectList from '../component/projectList';

const ListProject = () => {
    const [listProject, setListProject] = useState({});
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const getData = async () => {
            let pageIndex = 1;
            let pageSize = 10;
            let res = await projectApi.GetAllProject(pageIndex, pageSize);
            setListProject(res)
        }
        getData()
        setReload(false);
    }, [reload])
    
    return (
        <div>
            <ProjectList listProject={listProject} setReload={setReload} />
        </div>
    )
}

export default ListProject
