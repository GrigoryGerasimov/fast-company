import React, { useEffect } from "react";
import { ContainerWrapper } from "../../components/common/wrappers";
import { RegistrationForm } from "../../components/ui/registration/RegistrationForm";
import { getQualities, loadQualitiesList } from "../../store/qualities";
import { getProfessions, loadProfessionsList } from "../../store/professions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";

const SignUp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessions());

    if (!qualities || !professions) return <Loader/>;

    return (
        <ContainerWrapper>
            <RegistrationForm qualities={qualities} professions={professions}/>
        </ContainerWrapper>
    );
};

export default SignUp;
