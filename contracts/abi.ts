export const deployedcontracts = {
  84532: {
    yourcontract: {
      address: "0x25c20ad94935c94e68b5308b5815ef1f242178fa",
      abi: [
        {
          type: "constructor",
          inputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "receive",
          statemutability: "payable",
        },
        {
          type: "function",
          name: "basis_points",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "acceptsubmission",
          inputs: [
            {
              name: "_submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "approvedeliverable",
          inputs: [
            {
              name: "_submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "brandbriefs",
          inputs: [
            {
              name: "",
              type: "address",
              internaltype: "address",
            },
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "briefcounter",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "briefsubmissions",
          inputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "briefs",
          inputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "briefid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "brand",
              type: "address",
              internaltype: "address",
            },
            {
              name: "title",
              type: "string",
              internaltype: "string",
            },
            {
              name: "description",
              type: "string",
              internaltype: "string",
            },
            {
              name: "contentrequirements",
              type: "string",
              internaltype: "string",
            },
            {
              name: "paymentpercreator",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "creatorsneeded",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "selectedcreators",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "totalescrowed",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "submissiondeadline",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "contentdeadline",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "status",
              type: "uint8",
              internaltype: "enum yourcontract.briefstatus",
            },
            {
              name: "createdat",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "cancelbrief",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "closebrief",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "createbrief",
          inputs: [
            {
              name: "_title",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_description",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_contentrequirements",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_paymentpercreator",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_creatorsneeded",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_submissiondeadline",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_contentdeadline",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "payable",
        },
        {
          type: "function",
          name: "creatorsubmissions",
          inputs: [
            {
              name: "",
              type: "address",
              internaltype: "address",
            },
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getactivebriefs",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getallbriefs",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getbrandbriefs",
          inputs: [
            {
              name: "_brand",
              type: "address",
              internaltype: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getbrief",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internaltype: "struct yourcontract.brief",
              components: [
                {
                  name: "briefid",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "brand",
                  type: "address",
                  internaltype: "address",
                },
                {
                  name: "title",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "description",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "contentrequirements",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "paymentpercreator",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "creatorsneeded",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "selectedcreators",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "totalescrowed",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "submissiondeadline",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "contentdeadline",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "status",
                  type: "uint8",
                  internaltype: "enum yourcontract.briefstatus",
                },
                {
                  name: "createdat",
                  type: "uint256",
                  internaltype: "uint256",
                },
              ],
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getbriefsubmissions",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getcreatorsubmissions",
          inputs: [
            {
              name: "_creator",
              type: "address",
              internaltype: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getsubmission",
          inputs: [
            {
              name: "_submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple",
              internaltype: "struct yourcontract.submission",
              components: [
                {
                  name: "submissionid",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "briefid",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "creator",
                  type: "address",
                  internaltype: "address",
                },
                {
                  name: "proposaltext",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "portfoliolinks",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "deliverablelinks",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "status",
                  type: "uint8",
                  internaltype: "enum yourcontract.submissionstatus",
                },
                {
                  name: "submittedat",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "paymentreleased",
                  type: "uint256",
                  internaltype: "uint256",
                },
              ],
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "getsubmissionsbatch",
          inputs: [
            {
              name: "_submissionids",
              type: "uint256[]",
              internaltype: "uint256[]",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internaltype: "struct yourcontract.submission[]",
              components: [
                {
                  name: "submissionid",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "briefid",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "creator",
                  type: "address",
                  internaltype: "address",
                },
                {
                  name: "proposaltext",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "portfoliolinks",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "deliverablelinks",
                  type: "string",
                  internaltype: "string",
                },
                {
                  name: "status",
                  type: "uint8",
                  internaltype: "enum yourcontract.submissionstatus",
                },
                {
                  name: "submittedat",
                  type: "uint256",
                  internaltype: "uint256",
                },
                {
                  name: "paymentreleased",
                  type: "uint256",
                  internaltype: "uint256",
                },
              ],
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internaltype: "address",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "platformfeepercent",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "rejectsubmission",
          inputs: [
            {
              name: "_submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "setplatformfee",
          inputs: [
            {
              name: "_newfeepercent",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "submissioncounter",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "submissions",
          inputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          outputs: [
            {
              name: "submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "briefid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "creator",
              type: "address",
              internaltype: "address",
            },
            {
              name: "proposaltext",
              type: "string",
              internaltype: "string",
            },
            {
              name: "portfoliolinks",
              type: "string",
              internaltype: "string",
            },
            {
              name: "deliverablelinks",
              type: "string",
              internaltype: "string",
            },
            {
              name: "status",
              type: "uint8",
              internaltype: "enum yourcontract.submissionstatus",
            },
            {
              name: "submittedat",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "paymentreleased",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "view",
        },
        {
          type: "function",
          name: "submitdeliverables",
          inputs: [
            {
              name: "_submissionid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_deliverablelinks",
              type: "string",
              internaltype: "string",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "submitproposal",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_proposaltext",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_portfoliolinks",
              type: "string",
              internaltype: "string",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internaltype: "uint256",
            },
          ],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "updatebrief",
          inputs: [
            {
              name: "_briefid",
              type: "uint256",
              internaltype: "uint256",
            },
            {
              name: "_title",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_description",
              type: "string",
              internaltype: "string",
            },
            {
              name: "_contentrequirements",
              type: "string",
              internaltype: "string",
            },
          ],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "function",
          name: "withdrawplatformfees",
          inputs: [],
          outputs: [],
          statemutability: "nonpayable",
        },
        {
          type: "event",
          name: "briefcancelled",
          inputs: [
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "refundamount",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "briefcreated",
          inputs: [
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "brand",
              type: "address",
              indexed: true,
              internaltype: "address",
            },
            {
              name: "title",
              type: "string",
              indexed: false,
              internaltype: "string",
            },
            {
              name: "paymentpercreator",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
            {
              name: "creatorsneeded",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
            {
              name: "submissiondeadline",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "briefstatuschanged",
          inputs: [
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "newstatus",
              type: "uint8",
              indexed: false,
              internaltype: "enum yourcontract.briefstatus",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "briefupdated",
          inputs: [
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "title",
              type: "string",
              indexed: false,
              internaltype: "string",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "creatorselected",
          inputs: [
            {
              name: "submissionid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internaltype: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "escrowfunded",
          inputs: [
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "paymentreleased",
          inputs: [
            {
              name: "submissionid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internaltype: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "submissioncreated",
          inputs: [
            {
              name: "submissionid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "briefid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "creator",
              type: "address",
              indexed: true,
              internaltype: "address",
            },
            {
              name: "timestamp",
              type: "uint256",
              indexed: false,
              internaltype: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "submissionstatuschanged",
          inputs: [
            {
              name: "submissionid",
              type: "uint256",
              indexed: true,
              internaltype: "uint256",
            },
            {
              name: "newstatus",
              type: "uint8",
              indexed: false,
              internaltype: "enum yourcontract.submissionstatus",
            },
          ],
          anonymous: false,
        },
      ],
      inheritedfunctions: {},
      deployedonblock: 32779016,
    },
  },
} as const;
