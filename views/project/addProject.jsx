import React, { useState } from "react";

import AddNewProjectHeroSection from "../../components/addProjects/addNewProjectHeroSection";
import CreateNewProjectWizard from "../../components/addProjects/createNewProjectWizard";
import ProjectDetailStep from "../../components/addProjects/projectDetailstep";
import ProjectFootPrintStep from "../../components/addProjects/projectFootprintStep";
import ProjectGoalStep from "../../components/addProjects/projectGoalStep";
import { addCampaign } from "../../utils/services/actions/campaigns";
import { convertToFormData } from "../../utils/convert-to-form-data";
import { toast } from "react-toastify";
import { toasterMessages } from "../../constants/messages";
import { useHistory } from "react-router-dom";
import { validateObject } from "../../utils/validate-object";
import { useCountryCity } from "../../hooks/useCountryCity";

export default function AddProject() {
  const [createProjectId, setCreateProjectId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    goal_amount: "",
    expiration_date: "",
    time_length: "",
    address_city: "",
    address_state: "",
    address_country: "",
    address_zip: "",
    campaign_coordinator_id: "",
    good_goal_amount: "",
    volunteers: [
      {
        title: "",
        description: "",
        hours: "",
        number: "",
      },
    ],
    campaign_categorizations: {
      campaign_id: 1,
      campaign_category_id: 1,
    },
    images: [],
  });

  const history = useHistory();
  const {
    countries,
    selectedState,
    selectedCity,
    cities,
    states,
    onCountryChange,
    onStateChange,
  } = useCountryCity();
  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e
   * @param {string | undefined} objKey
   */
  const onValueChange = (e, objKey) => {
    const { name: elemName, value, type: elemType, checked } = e.target;
    if (elemName === "address_zip" && value.length > 8) {
      toast.error("Zip code cannot have more than 8 characters", {
        toastId: "validation",
      });
      return;
    }
    if (objKey) {
      setValues((prev) => ({
        ...prev,
        [objKey]: {
          ...prev[objKey],
          [elemName]: elemType === "checkbox" ? checked : value,
        },
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [elemName]: elemType === "checkbox" ? checked : value,
      }));
    }
  };

  const onAddVolunteer = () => {
    setValues((prev) => ({
      ...prev,
      volunteers: [
        ...prev.volunteers,
        {
          title: "",
          description: "",
          hours: 0,
          number: 0,
        },
      ],
    }));
  };

  /**
   * @param {number} index
   */
  const onRemoveVolunteer = (index) => {
    if (!index) {
      return;
    }
    setValues((prev) => {
      const volunteers = prev.volunteers.filter((_, idx) => idx !== index);
      return {
        ...prev,
        volunteers: [...volunteers],
      };
    });
  };

  const onVolunteerChange = (e, index) => {
    const { name: elemName, value, type: elemType, checked } = e.target;
    const currentValues = values.volunteers.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [elemName]: elemType === "checkbox" ? checked : value,
        };
      }
      return item;
    });
    setValues((prev) => ({
      ...prev,
      volunteers: currentValues,
    }));
  };

  const onFileChange = (e, status) => {
    const { file } = e;
    if (["done", "removed"].includes(status)) {
      setValues((prev) => {
        const imageFound = prev.images.find((item) => item.name === file.name);
        if (imageFound && status !== "removed") {
          return { ...prev };
        }
        return {
          ...prev,
          images:
            status === "removed"
              ? [
                  ...prev.images.filter(
                    (item) => item?.name !== imageFound?.name
                  ),
                ]
              : [...prev.images, file],
        };
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    let validate;
    // handle first step validation
    if (createProjectId === 0) {
      validate = validateObject(values, [
        "name",
        "time_length",
        "description",
        "expiration_date",
        "goal_amount",
        "images",
      ]);
      if (validate.hasErrors) {
        return toast.error(toasterMessages.validation);
      }
      return setCreateProjectId(1);
    }

    if (createProjectId === 1) {
      const isValid = values.volunteers.every((item) => {
        const { title, hours, number, description } = item;
        return !!(title && hours && number && description);
      });
      if (!isValid) {
        return toast.error(toasterMessages.validation);
      }
      return setCreateProjectId(2);
    }
    const objectKeys = [
      "address_country",
      states.length > 0 && !selectedState ? "address_state" : undefined,
      cities.length > 0 && !selectedCity ? "address_city" : undefined,
    ];
    validate = validateObject(values, objectKeys);
    if (createProjectId === 2 && validate.hasErrors) {
      return toast.error(toasterMessages.validation);
    }
    if (values.address_zip && values.address_zip.length < 2) {
      toast.error("Zip code cannot be less than 2 characters", {
        toastId: "validation",
      });
      return;
    }

    try {
      setLoading(true);
      await addCampaign(convertToFormData(values));
      toast.info(toasterMessages.campaign_added);
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.info(error);
    }
  };

  return (
    <main className="main">
      <AddNewProjectHeroSection />
      <CreateNewProjectWizard
        createProjectId={createProjectId}
        setcreateProjectId={setCreateProjectId}
        onChange={onValueChange}
        values={values}
        onSubmit={onSubmit}
      />
      <ProjectDetailStep
        createProjectId={createProjectId}
        setcreateProjectId={setCreateProjectId}
        onChange={onValueChange}
        values={values}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
      <ProjectGoalStep
        createProjectId={createProjectId}
        setcreateProjectId={setCreateProjectId}
        onChange={onValueChange}
        onVolunteerChange={onVolunteerChange}
        onAddVolunteer={onAddVolunteer}
        onRemoveVolunteer={onRemoveVolunteer}
        values={values}
        onSubmit={onSubmit}
      />
      <ProjectFootPrintStep
        createProjectId={createProjectId}
        setcreateProjectId={setCreateProjectId}
        onChange={onValueChange}
        values={values}
        onSubmit={onSubmit}
        countries={countries}
        cities={cities}
        states={states}
        onCountryChange={onCountryChange}
        onStateChange={onStateChange}
      />
    </main>
  );
}
