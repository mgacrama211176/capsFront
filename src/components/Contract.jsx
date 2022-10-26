import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const document = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "scroll",
};

const Contract = () => {
  return (
    <div>
      <Box sx={document}>
        <Typography variant="h6" component="h2">
          TERMS AND CONDITIONS
        </Typography>
        <br />
        <Typography variant="h6" component="h2">
          1. AGREEMENT TO TERMS
        </Typography>
        <Typography variant="body2" component="h6">
          These Terms of Use constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (“you”) and FilAnime
          ("Company," “we," “us," or “our”), concerning your access to and use
          of the filanime website as well as any other media form, media
          channel, mobile website or mobile application related, linked, or
          otherwise connected thereto (collectively, the “Site”). We are
          registered in the Philippines and have our registered office at
          __________, Cebu, Cebu 6000. You agree that by accessing the Site, you
          have read, understood, and agreed to be bound by all of these Terms of
          Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
          EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE
          IMMEDIATELY.
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          Supplemental terms and conditions or documents that may be posted on
          the Site from time to time are hereby expressly incorporated herein by
          reference. We reserve the right, in our sole discretion, to make
          changes or modifications to these Terms of Use from time to time. We
          will alert you about any changes by updating the “Last updated” date
          of these Terms of Use, and you waive any right to receive specific
          notice of each such change. Please ensure that you check the
          applicable Terms every time you use our Site so that you understand
          which Terms apply. You will be subject to, and will be deemed to have
          been made aware of and to have accepted, the changes in any revised
          Terms of Use by your continued use of the Site after the date such
          revised Terms of Use are posted.
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          The information provided on the Site is not intended for distribution
          to or use by any person or entity in any jurisdiction or country where
          such distribution or use would be contrary to law or regulation or
          which would subject us to any registration requirement within such
          jurisdiction or country. Accordingly, those persons who choose to
          access the Site from other locations do so on their own initiative and
          are solely responsible for compliance with local laws, if and to the
          extent local laws are applicable.
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          The Site is not tailored to comply with industry-specific regulations
          (Health Insurance Portability and Accountability Act (HIPAA), Federal
          Information Security Management Act (FISMA), etc.), so if your
          interactions would be subjected to such laws, you may not use this
          Site. You may not use the Site in a way that would violate the
          Gramm-Leach-Bliley Act (GLBA).
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          The Site is intended for users who are at least 13 years of age. All
          users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Site. If
          you are a minor, you must have your parent or guardian read and agree
          to these Terms of Use prior to you using the Site.
        </Typography>
        <br />
        <Typography variant="h6" component="h2">
          2. INTELLECTUAL PROPERTY RIGHTS
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          Unless otherwise indicated, the Site is our proprietary property and
          all source code, databases, functionality, software, website designs,
          audio, video, text, photographs, and graphics on the Site
          (collectively, the “Content”) and the trademarks, service marks, and
          logos contained therein (the “Marks”) are owned or controlled by us or
          licensed to us, and are protected by copyright and trademark laws and
          various other intellectual property rights and unfair competition laws
          of the United States, international copyright laws, and international
          conventions. The Content and the Marks are provided on the Site “AS
          IS” for your information and personal use only. Except as expressly
          provided in these Terms of Use, no part of the Site and no Content or
          Marks may be copied, reproduced, aggregated, republished, uploaded,
          posted, publicly displayed, encoded, translated, transmitted,
          distributed, sold, licensed, or otherwise exploited for any commercial
          purpose whatsoever, without our express prior written permission.
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          Provided that you are eligible to use the Site, you are granted a
          limited license to access and use the Site and to download or print a
          copy of any portion of the Content to which you have properly gained
          access solely for your personal, non-commercial use. We reserve all
          rights not expressly granted to you in and to the Site, the Content
          and the Marks.
        </Typography>
        <br />
        <Typography variant="h6" component="h2">
          3. USER REPRESENTATIONS
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          By using the Site, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Terms
          of Use; (4) you are not under the age of 13; (5) you are not a minor
          in the jurisdiction in which you reside, or if a minor, you have
          received parental permission to use the Site; (6) you will not access
          the Site through automated or non-human means, whether through a bot,
          script, or otherwise; (7) you will not use the Site for any illegal or
          unauthorized purpose; and (8) your use of the Site will not violate
          any applicable law or regulation.
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Site (or
          any portion thereof).
        </Typography>
        <br />
        <Typography variant="h6" component="h2">
          4. USER REGISTRATION
        </Typography>
        <br />
        <Typography variant="body2" component="h6">
          You may be required to register with the Site. You agree to keep your
          password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </Typography>
      </Box>
    </div>
  );
};

export default Contract;
