import React, { MouseEventHandler } from "react";
import { Form, Formik } from "formik";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import { FormGroup } from "../FormGroup/FormGroup";
import { CheckItem } from "../FormGroup/CheckItem/CheckItem";
import {
  canTakeApprenticeship,
  expectedContractType,
  expectedTypeWork,
  degrees,
  initialValues,
  InitialValues,
} from "./filterFormData";
import classes from "./FilterForm.module.css";

interface Props {
  closeModal: MouseEventHandler;
}

const printValues = (values: InitialValues) => {
  const {
    courseCompletion,
    courseEngagment,
    projectDegree,
    teamProjectDegree,
    expectedTypeWork,
    expectedContractType,
    canTakeApprenticeship,
  } = values;

  return `
    courseCompletion: ${courseCompletion}
    courseEngagment: ${courseEngagment}
    projectDegree: ${projectDegree}
    teamProjectDegree: ${teamProjectDegree}
    expectedTypeWork: ${expectedTypeWork.join(", ")}
    expectedContractType: ${expectedContractType.join(", ")}
    canTakeApprenticeship: ${canTakeApprenticeship}
  `;
};

export const FilterForm = ({ closeModal }: Props) => {
  return (
    <div className={classes.FilterForm}>
      <div className={classes.row}>
        <h2>Filtrowanie</h2>
        <PrimaryButton size="normal" color="quaternary">
          Wyczyść wszystkie
        </PrimaryButton>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => alert(printValues(values))}
      >
        <Form className={classes.form}>
          <FormGroup title="Ocena przejścia kursu">
            {degrees.map(({ value, name }) => (
              <CheckItem
                type="radio"
                groupName="courseCompletion"
                value={value}
                name={name}
                icon="star"
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Ocena aktywności i zaangażowania na kursie">
            {degrees.map(({ value, name }) => (
              <CheckItem
                type="radio"
                groupName="courseEngagment"
                value={value}
                name={name}
                icon="star"
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Ocena kodu w projekcie własnym">
            {degrees.map(({ value, name }) => (
              <CheckItem
                type="radio"
                groupName="projectDegree"
                value={value}
                name={name}
                icon="star"
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Ocena pracy w zespole w Scrum">
            {degrees.map(({ value, name }) => (
              <CheckItem
                type="radio"
                groupName="teamProjectDegree"
                value={value}
                name={name}
                icon="star"
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Preferowane miejsce pracy">
            {expectedTypeWork.map(({ value, name }) => (
              <CheckItem
                type="checkbox"
                groupName="expectedTypeWork"
                value={value}
                name={name}
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Oczekiwany typ kontraktu">
            {expectedContractType.map(({ value, name }) => (
              <CheckItem
                type="checkbox"
                groupName="expectedContractType"
                value={value}
                name={name}
                key={value}
              />
            ))}
          </FormGroup>
          <FormGroup title="Zgoda na odbycie bezpłatnych praktyk/stażu na początek">
            {canTakeApprenticeship.map(({ value, name }) => (
              <CheckItem
                type="radio"
                groupName="canTakeApprenticeship"
                value={value}
                name={name}
                key={value}
              />
            ))}
          </FormGroup>
          <div className={classes.bottomButtons}>
            <PrimaryButton
              size="normal"
              color="quaternary"
              onClick={closeModal}
            >
              Anuluj
            </PrimaryButton>
            <PrimaryButton type="submit" onClick={closeModal}>
              Pokaż wyniki
            </PrimaryButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
