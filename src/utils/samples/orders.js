import { ORDER_STATUS } from "./../constants";

export const ORDERS_LIST = [
  {
    key: "12211",
    id: "12211",
    status: "COMPLETED",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "johnwick@gmail.com",
    delivery_type: "Standard",
  },
  {
    key: "12212",
    id: "12212",
    status: "PENDING",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "alicejohnson@gmail.com",
    delivery_type: "Urgent",
  },
  {
    key: "12213",
    id: "12213",
    status: "IN_PROCESS",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "oliviamartin@gmail.com",
    delivery_type: "Standard",
  },
  {
    key: "12214",
    id: "12214",
    status: "PENDING",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "danielclark@gmail.com",
    delivery_type: "Urgent",
  },
  {
    key: "12215",
    id: "12215",
    status: "IN_PROCESS",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "sophiaanderson@gmail.com",
    delivery_type: "Standard",
  },
  {
    key: "12216",
    id: "12216",
    status: "COMPLETED",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "matthewwilson@gmail.com",
    delivery_type: "Urgent",
  },
  {
    key: "12217",
    id: "12217",
    status: "REJECTED",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "emmathompson@gmail.com",
    delivery_type: "Standard",
  },
  {
    key: "12218",
    id: "12218",
    status: "IN_PROCESS",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "emilybrown@gmail.com",
    delivery_type: "Urgent",
  },
  {
    key: "12219",
    id: "12219",
    status: "REJECTED",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "alicejohnson@gmail.com",
    delivery_type: "Standard",
  },
  {
    key: "12220",
    id: "12220",
    status: "IN_PROCESS",
    created: "10 Jul 21, 9:30 pm",
    due: "15 Jul 21, 9:30 pm",
    amount: "150",
    customer_mail: "alicejohnson@gmail.com",
    delivery_type: "Urgent",
  },
];

export const ORDER_DETAIL = {
  id: "12312",
  status: ORDER_STATUS.PENDING,
  amount: "150",
  created: "10 Jul 21, 9:30 pm",
  due: "15 Jul 21, 9:30 pm",
  items: [
    {
      key: "1",
      website: "https://www.entrepreneur.com",
      status: "PENDING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },

    {
      key: "2",
      website: "https://www.entrepreneur.com",
      status: "IN_WRITING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "user_upload",
    },
    {
      key: "3",
      website: "https://www.entrepreneur.com",
      status: "PUBLISHED",
      published_url:
        "https://www.entrepreneur.com/living/heres-a-counterintuitive-way-to-combat-any-toxic/452421",

      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,

      content_type: "custom_request",
    },
    {
      key: "4",
      website: "https://www.inc.com",
      status: "SUBMITTED",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },

    {
      key: "5",
      website: "https://www.inc.com",
      status: "SUBMITTED",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
    {
      key: "6",
      website: "https://www.inc.com",
      status: "PUBLISHED",
      published_url:
        "https://www.entrepreneur.com/living/heres-a-counterintuitive-way-to-combat-any-toxic/452421",

      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
    {
      key: "7",
      website: "https://www.forbes.com",
      status: "PENDING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },

    {
      key: "8",
      website: "https://www.forbes.com",
      status: "PENDING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
    {
      key: "9",
      website: "https://www.forbes.com",
      status: "PUBLISHED",
      published_url:
        "https://www.entrepreneur.com/living/heres-a-counterintuitive-way-to-combat-any-toxic/452421",

      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
    {
      key: "10",
      website: "https://www.entrepreneur.com",
      status: "PENDING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },

    {
      key: "11",
      website: "https://www.entrepreneur.com",
      status: "PENDING",
      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
    {
      key: "12",
      website: "https://www.entrepreneur.com",
      status: "PUBLISHED",
      published_url:
        "https://www.entrepreneur.com/living/heres-a-counterintuitive-way-to-combat-any-toxic/452421",

      links: [
        {
          anchor_text: "10 Downing Street",
          target_url: "https://www.website1.com",
        },
        {
          anchor_text: "20 Downing Street",
          target_url: "https://www.website2.com",
        },
        {
          anchor_text: "30 Downing Street",
          target_url: "https://www.website3.com",
        },
      ],
      category: "health",
      price: 10,
      content_type: "custom_request",
    },
  ],
  history: [
    { time: "10 Jul 21, 9:30 pm", event: "Order Created" },
    {
      time: "10 Jul 21, 9:30 pm",
      event: "Order Status Changed to 'In Process'",
    },
    {
      time: "10 Jul 21, 9:30 pm",
      event:
        "Post status of 'https://www.entrepreneur.com' changed to 'In-Writing'",
    },
    {
      time: "10 Jul 21, 9:30 pm",
      event:
        "Post status of 'https://www.entrepreneur.com' changed to 'Submitted'",
    },
    {
      time: "10 Jul 21, 9:30 pm",
      event:
        "Post status of 'https://www.entrepreneur.com' changed to 'Published'",
    },
    {
      time: "10 Jul 21, 9:30 pm",
      event: "Order Status Changed to 'Completed'",
    },
    {
      time: "10 Jul 21, 9:30 pm",
      event: "Order Status Changed to 'Completed'",
    },
  ],
};
