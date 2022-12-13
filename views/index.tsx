import { Loader } from "../shared/Loader/Loader";
import LoginView from "./auth/login";
import React from "react";
import SignUpView from "./auth/signup";
import dynamic from "next/dynamic";
import { MyArtWorks } from "./artworks";

const ArtCreateView = dynamic(() => import("./artCreate"), {
  loading: () => <Loader />,
  ssr: false,
});

const ChatView = dynamic(() => import("./chat"), {
  loading: () => <Loader />,
  ssr: false,
});

const AboutUsView = dynamic(() => import("./about"), {
  loading: () => <Loader />,
});

const AddNewProjectView = dynamic(() => import("./project/addProject"), {
  loading: () => <Loader />,
});

const ProjectsView = dynamic(() => import("./project/projects"), {
  loading: () => <Loader />,
  ssr: false,
});

const ProjectDetailsView = dynamic(() => import("./project/details"), {
  loading: () => <Loader />,
  ssr: false,
});

const GoodEconomyView = dynamic(() => import("./goodEconomy"), {
  loading: () => <Loader />,
  ssr: false,
});

const CampaignVolunteersView = dynamic(() => import("./project/volunteers"), {
  loading: () => <Loader />,
  ssr: false,
});

const VolunteerTasks = dynamic(() => import("./volunteer/tasks"), {
  loading: () => <Loader />,
});

const ProfileView = dynamic(() => import("./auth/profile"), {
  loading: () => <Loader />,
});

const ForgetPasswordView = dynamic(() => import("./auth/forget-password"), {
  loading: () => <Loader />,
  ssr: false,
});

const ResetPasswordView = dynamic(() => import("./auth/reset-password"), {
  loading: () => <Loader />,
  ssr: false,
});

export {
  LoginView,
  SignUpView,
  ChatView,
  AboutUsView,
  AddNewProjectView,
  GoodEconomyView,
  ArtCreateView,
  ProjectsView,
  CampaignVolunteersView,
  VolunteerTasks,
  ProfileView,
  ProjectDetailsView,
  ForgetPasswordView,
  ResetPasswordView,
  MyArtWorks as ArtworksView,
};
