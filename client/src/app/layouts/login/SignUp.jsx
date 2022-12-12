import React, { useEffect } from "react";
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3 shadow p-4">
                    <h3 className="mb-4">Регистрация</h3>
                    <RegistrationForm qualities={qualities} professions={professions}/>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
