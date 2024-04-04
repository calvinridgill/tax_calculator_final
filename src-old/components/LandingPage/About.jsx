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
        component={"img"}
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
      <Stack flex={4} gap={2} justifyContent={"space-between"}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              pt: 4,
              pb: 2,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontFamily: "Lato, sans-serif" }}>
            {children}
          </Typography>
        </Box>
        {detailLink && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
    title: "The Best Tax Preparation Spreadsheet for Individuals",
    link: "/about/the-best-tax-preparation-spreadsheet-for-individuals",
    imgSrc: "/images/finance_r_1240_800.webp",
    description_short:
      "At EZ Profit & Loss Statements plus Schedule C, we help Independent contractors, save hundreds to thousands of dollars on their taxes by deducting expenses from your 1099 income to reduce your income. Our do it yourself format is great for reducing the income of all Gig Workers, 1099s, Independent Contractors ...",
    description_long:
      "At EZ Profit & Loss Statements plus Schedule C, we help Independent contractors, save hundreds to thousands of dollars on their taxes by deducting expenses from your 1099 income to reduce your income. Our do it yourself format is great for reducing the income of all Gig Workers, 1099s, Independent Contractors and Freelancers. Also an excellent way for uber, lyft, grubhub, freelancers, doordash workers to reduce their income. Younger workers, show your parents your reduced income so you can continue to be included as a dependent on their tax return.",
  },
  {
    title: "A Tool for Independent Contractors",
    link: "/about/a-tool-for-independent-contractors",
    imgSrc: "/images/business_meeting_person_r_1125_700.jpg",
    description_short:
      "EZ Profit & Loss is a comprehensive tool that shows you how much you make (Net Profit) as you enter your numbers. It's as simple as entering your expenses (such as gas, supplies, repairs, etc.) and your income (from 1099's or your own calculations). EZ Profit & Loss will show your net income and automatically ...",
    description_long:
      "EZ Profit & Loss is a comprehensive tool that shows you how much you make (Net Profit) as you enter your numbers. It's as simple as entering your expenses (such as gas, supplies, repairs, etc.) and your income (from 1099's or your own calculations). EZ Profit & Loss will show your net income and automatically calculate your tax return, including any self-employment tax, to show you your refund amount. The spreadsheet is in the proper Schedule C format to give to your tax preparer or to insert onto your self-prepared return, and it will automatically produce a properly formatted profit and loss statement, which is the accepted format for presenting your self-employment income. Use this statement to document your income for loans, medical insurance, or any entity requesting your independent contractor income.",
  },
  {
    title: "Do it yourself Profit & Loss Statement",
    link: "/about/do-it-yourself-profit-and-loss-statement",
    imgSrc: "/images/spreadsheet_and_pen.jpg",
    description_short:
      "A must for gig workers, freelancers, independent contractors, and 1099 recipients, this spreadsheet is designed to simplify the process of income tax preparation. Whether you're a small business owner, a freelancer, or an individual, this tool will help you manage and organize your financial records, including ...",
    description_long:
      "A must for gig workers, freelancers, independent contractors, and 1099 recipients, this spreadsheet is designed to simplify the process of income tax preparation. Whether you're a small business owner, a freelancer, or an individual, this tool will help you manage and organize your financial records, including income, expenses, loans, medical insurance, Obama Care, and real estate loans. With its user-friendly interface and customizable features, you can easily input, track and analyze your financial data, ensuring accuracy and efficiency in your tax preparation.",
  },
];
