import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState([]);
  const [professions, setProfession] = useState([]);
  const isValid = Object.keys(errors).length === 0;

  const getProfessionById = (id) => {
    if (typeof id === "string") {
      for (const prof of professions) {
        if (prof.value === id) {
          return { _id: prof.value, name: prof.label };
        }
      }
    } else {
      return id;
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));

    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    validate();
  }, [user]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    }
  };

  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = user;

    api.users.update(userId, {
      ...user,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    history.goBack();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {user && professions ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите Вашу профессию"
                defaultOption="Choose..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={user.profession._id}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите Ваши качества"
                defaultValue={user.qualities.map((el) => ({
                  value: el._id,
                  label: el.name,
                  color: el.color
                }))}
              />
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
