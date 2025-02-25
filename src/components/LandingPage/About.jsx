import React, { useState } from "react";
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { SubHeader } from "./SubHeader";
import { useTheme, useMediaQuery } from "@mui/material";

const commonStyles = {
  container: {
    xs: "100%",
    sm: "80%",
    md: "960px",
    lg: "1024px",
  },
};
export function About() {
  const [loadMore, setLoadMore] = useState(false);
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ pt: 5, pb: 5 }}>
      {/* header */}
      <SubHeader title={"About"} />
      <Box>
        <Container
          sx={{
            maxWidth: commonStyles.container,
            mt: 5,
          }}
        >
          <Stack spacing={5}>
            <Service
              imgSrc={aboutContents[0].imgSrc}
              title={aboutContents[0].title}
              detailLink={aboutContents[0].link}
            >
              {aboutContents[0].description_short}
            </Service>
            <Service
              imgSrc={aboutContents[1].imgSrc}
              title={aboutContents[1].title}
              reverse={!isMedium}
              detailLink={aboutContents[1].link}
            >
              {aboutContents[1].description_short}
            </Service>
            {!loadMore && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    setLoadMore(true);
                  }}
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    pl: 2,
                    pr: 2,
                    color: "black",
                    borderColor: "black",
                    fontWeight: "normal",
                    "&:hover": {
                      borderColor: "black",
                      boxShadow: 1,
                    },
                  }}
                >
                  Load More...
                </Button>
              </Box>
            )}
            {loadMore && (
              <Service
                title={aboutContents[2].title}
                imgSrc={aboutContents[2].imgSrc}
                detailLink={aboutContents[2].link}
              >
                {aboutContents[2].description_short}
              </Service>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export function Service({
  imgSrc,
  detailLink,
  title,
  children,
  reverse = false,
}) {
  const image = (
    <Box flex={6}>
      <Box
        component="img"
        alt="A person using a calculator for finance"
        src={imgSrc}
        sx={{
          height: "400px",
          width: "100%",
          objectFit: "cover",
          transition: "opacity 1.5s ease 0s",
        }}
      />
    </Box>
  );

  return (
    <Stack
      sx={{
        position: "relative",
        flexDirection: { md: "row" },
        gap: { xs: 0, md: 5 },
      }}
    >
      {!reverse && image}
      <Stack flex={4} gap={2} justifyContent="space-between">
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              pt: 0,
              pb: 2,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ fontFamily: "Lato, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        </Box>
        {detailLink && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={detailLink} style={{ color: "black", fontSize: "12px" }}>
              READ MORE
            </Link>
          </Box>
        )}
      </Stack>
      {reverse && image}
    </Stack>
  );
}

Service.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  detailLink: PropTypes.string,
  children: PropTypes.string,
  title: PropTypes.string,
  reverse: PropTypes.bool,
};

export const aboutContents = [
  {
    title:
      "The Best Federal Income Tax Refund or Amount Owed Calculator For Individuals",
    link: "/about/the-best-federal-income-tax-refund-or-amount-owed-calculator-for-individuals",
    imgSrc: "/images/finance_r_1240_800.webp",
    description_short: `
    <p>Our Income Tax Calculator has a simple, easy-to-use format.</p>
      <p><strong>Just enter your income, and it shows you your refund or amount owed.</strong></p>
      <p>
        First, you select your type of Work Income:  
        <strong><ins>Independent Contractor Income</ins></strong>  
        <strong>Or</strong>  
        <strong><ins>Regular Employee Income.</ins></strong>
      </p>
      <p>
        <strong>Examples of </strong><strong><ins>Independent Contractor Income:</ins></strong> 
        Self-Employed; ...
      </p>
  `,
    description_long: `
      <p>Our Income Tax Calculator has a simple, easy-to-use format.&nbsp;</p>
      <p><strong>Just enter your income and it shows you your refund or amount owed.</strong>&nbsp;</p>
      <p>
        First you select your type of Work Income:  
        <strong><ins>Independent Contractor Income</ins></strong>  
        <strong>Or</strong>  
        <strong><ins>Regular Employee Income.</ins></strong>
      </p>
      <p>
        <strong>Examples Of</strong>  
        <strong><ins>Independent Contractor Income:</ins></strong>  
        Self-Employed; Gig Worker; 1099s; Uber; Lyft; Grubhub; Freelancers; Doordash.
      </p>
      <p>
        <strong>Examples of Regular Job Income:</strong>  
        Regular Wage Employee; Hourly Employee; W-2 Employee; Salary Employee.
      </p>
      <p>
        Next, select <strong>Filing Status.</strong> Examples of Filing Status:  
        <strong> Single with no dependents; </strong>  
        <strong>Head of Household with 1 Dependent.</strong>
      </p>
      <p><strong>Finally, Enter Your Income and Your Refund or Amount Owed is Calculated.</strong></p>
      <p>
        <strong><ins>Special Note for This Early Bird Edition:</ins></strong>  
        <strong><ins>
          Tax Calculations available only for Single Self-Employed and Wage Earner Income with no Dependents up to 50,000.  
          Single With One Dependent Calculations up to 50,000.  
          Amounts Calculated are not guaranteed to be precise. Consult your Tax Professional for Exact Amounts.
        </ins></strong>
      </p>
  `,
  },
  {
    title: "Complex U.S. Tax Code Built into Calculator for Easy Use",
    link: "/about/complex-u-s-tax-code-built-into-calculator-for-easy-use",
    imgSrc: "/images/business_meeting_person_r_1125_700.jpg",
    description_short:
      "<p>Our simple-to-use refund amount or tax owed calculator has the complicated U.S. Tax Code built in.</p> \
     <p>You don't have to worry about Standard Deductions, Self-Employment Tax, Earned Income Credits (also available to single-income earners with no kids), \
     Child Tax Credits, and even penalties if applicable. It’s all built ...</p>",
    description_long:
      "<p>Our simple-to-use refund amount or tax owed calculator has the complicated U.S. Tax Code built in.</p> \
     <p>You don't have to worry about Standard Deductions, Self-Employment Tax, Earned Income Credits (also available to single-income earners with no kids), \
     Child Tax Credits, and even penalties if applicable. It’s all built into the software for the most accurate calculator available.</p> \
     <p>Our Tax Calculator also has a Profit and Loss Statement calculator as an additional tool to reduce the amount of tax you owe. \
     It provides a great format for reducing your taxable income by deducting expenses from earnings. An excellent tool for Independent Contractors and Gig workers. \
     Give this Profit and Loss Statement to your Tax Professional to reduce their fees and your taxes.</p>",
  },
  {
    title: "Do-It-Yourself Profit & Loss Statement",
    link: "/about/do-it-yourself-profit-and-loss-statement",
    imgSrc: "/images/spreadsheet_and_pen.jpg",
    description_short:
      "<p>A must-have for gig workers, freelancers, independent contractors, and 1099 recipients, this spreadsheet is designed to simplify the process of income tax preparation. \
     Whether you're a small business owner, a freelancer, or an individual, this tool will help you manage and organize your financial records, including ...</p>",
    description_long:
      "<p>A must-have for gig workers, freelancers, independent contractors, and 1099 recipients, this spreadsheet is designed to simplify the process of income tax preparation.</p> \
     <p>Whether you're a small business owner, a freelancer, or an individual, this tool will help you manage and organize your financial records, including income, expenses, \
     loans, medical insurance, Obamacare, and real estate loans. With its user-friendly interface and customizable features, you can easily input, track, and analyze your \
     financial data, ensuring accuracy and efficiency in your tax preparation.</p>",
  },
];
