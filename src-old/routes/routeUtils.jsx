import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthProvider";
import { PageNotFound } from "../components/PageNotFound";

export function RestrictedTo({ role, children }) {
  const auth = useAuth();
  if (auth.user && role.includes(auth.user.role)) return children;
  return <PageNotFound />;
}

RestrictedTo.propTypes = {
  role: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
