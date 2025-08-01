const message = {
  users: [
    {
      id: 1,
      email: "sumit@learnwithsumit.com",
      password: "$2a$10$CtHS.yCGS80jiuZx8yKEI...",
      name: "Sumit Saha",
      avatar: "/avatars/u1.jpg",
      lastSeen: "2023-01-01T10:00:00Z",
      status: "online",
    },
  ],
  conversations: [
    {
      id: 1,
      type: "direct", // or "group"
      participants: [1, 2], // user IDs
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T10:00:00Z",
      lastMessageId: 2, // from messages collections
    },
  ],
  messages: [
    {
      id: 1,
      conversationId: 1,
      senderId: 1,
      content: {
        type: "text",
        text: "Hello there!",
      },
      createdAt: "2023-01-01T09:00:00Z",
      status: "read", // or "delivered", "sent"
      readBy: [2], // array of user IDs who read it
    },
    {
      id: 2,
      conversationId: 1,
      senderId: 2,
      content: {
        type: "file",
        file: {
          url: "/uploads/file123.pdf",
          name: "document.pdf",
          type: "application/pdf",
          size: 102400,
        },
      },
      createdAt: "2023-01-01T10:00:00Z",
      status: "delivered",
    },
  ],
  attachments: [
    {
      id: 1,
      messageId: 2,
      url: "/uploads/file123.pdf",
      type: "file",
      name: "document.pdf",
      size: 102400,
      uploadedBy: 2,
      uploadedAt: "2023-01-01T09:58:00Z",
    },
  ],
};

const messages1 = {
  users: [
    {
      email: "sumit@learnwithsumit.com",
      password: "$2a$10$CtHS.yCGS80jiuZx8yKEI.5zdiZykHF/6aPTDqpHl6ZqEFGISOHKO",
      name: "Sumit Saha",
      id: 1,
    },
    {
      email: "akash@learnwithsumit.com",
      password: "$2a$10$CtHS.yCGS80jiuZx8yKEI.5zdiZykHF/6aPTDqpHl6ZqEFGISOHKO",
      name: "Akash Ahmed",
      id: 2,
    },
    {
      email: "saad@learnwithsumit.com",
      password: "$2a$10$CtHS.yCGS80jiuZx8yKEI.5zdiZykHF/6aPTDqpHl6ZqEFGISOHKO",
      name: "Saad Hasan",
      id: 3,
    },
  ],
  conversations: [
    {
      id: 1,
      participants: "sumit@learnwithsumit.com-akash@learnwithsumit.com",
      users: [
        {
          email: "sumit@learnwithsumit.com",
          name: "Sumit Saha",
          id: 1,
        },
        {
          email: "akash@learnwithsumit.com",
          name: "Akash Ahmed",
          id: 2,
        },
      ],
      message: "How are you?",
      timestamp: 1661976143678,
    },
    {
      id: 2,
      participants: "sumit@learnwithsumit.com-saad@learnwithsumit.com",
      users: [
        {
          email: "sumit@learnwithsumit.com",
          name: "Sumit Saha",
          id: 1,
        },
        {
          email: "akash@learnwithsumit.com",
          name: "Saad Hasan",
          id: 3,
        },
      ],
      message: "How are you?",
      timestamp: 1661976143678,
    },
  ],
  messages: [
    {
      id: 1,
      conversationId: 1,
      sender: {
        email: "sumit@learnwithsumit.com",
        name: "Sumit Saha",
        id: 1,
      },
      receiver: {
        email: "akash@learnwithsumit.com",
        name: "Akash Ahmed",
        id: 2,
      },
      message: "Hello",
      timestamp: 1661976143557,
    },
    {
      id: 2,
      conversationId: 1,
      sender: {
        email: "akash@learnwithsumit.com",
        name: "Akash Ahmed",
        id: 2,
      },
      receiver: {
        email: "sumit@learnwithsumit.com",
        name: "Sumit Saha",
        id: 1,
      },
      message: "How are you?",
      timestamp: 1661976143678,
    },
  ],
};
