// ============================================
// GOLDCHAT — MODERN MESSENGER
// ============================================


// ============================================
// CHAT DATA
// ============================================

const chats = [

    {
        id: 1,
        name: "Sardor Dev",
        username: "@sardor_dev",
        avatar: "SD",
        status: "● Hozir onlayn",
        time: "14:32",
        unread: 2,

        messages: [

            {
                type: "incoming",
                text: "Salom! 👋",
                time: "14:20"
            },

            {
                type: "incoming",
                text: "Yangi loyihani ko‘rdingmi?",
                time: "14:21"
            },

            {
                type: "outgoing",
                text: "Ha, juda zo‘r chiqibdi 🔥",
                time: "14:22"
            },

            {
                type: "incoming",
                text: "Bugun yana bir nechta funksiya qo‘shamiz 🚀",
                time: "14:24"
            },

            {
                type: "outgoing",
                text: "Mayli, boshlaymiz 😎",
                time: "14:32"
            }

        ]
    },


    {
        id: 2,
        name: "Madina UI",
        username: "@madina_ui",
        avatar: "MU",
        status: "● Hozir onlayn",
        time: "13:45",
        unread: 5,

        messages: [

            {
                type: "incoming",
                text: "Yangi UI tayyor 🎨",
                time: "13:40"
            },

            {
                type: "incoming",
                text: "Ko‘rib fikringni ayt.",
                time: "13:45"
            }

        ]
    },


    {
        id: 3,
        name: "IT O‘zbekiston",
        username: "@it_uz",
        avatar: "IT",
        status: "12 450 a'zo",
        time: "12:30",
        unread: 12,

        messages: [

            {
                type: "incoming",
                text: "🚀 Yangi IT yangiliklari!",
                time: "12:30"
            }

        ]
    },


    {
        id: 4,
        name: "Akmal Code",
        username: "@akmal_code",
        avatar: "AC",
        status: "● 5 daqiqa oldin",
        time: "11:20",
        unread: 0,

        messages: [

            {
                type: "incoming",
                text: "Kodlarni yubordim 💻",
                time: "11:20"
            }

        ]
    },


    {
        id: 5,
        name: "Frontend UZ",
        username: "@frontend_uz",
        avatar: "FE",
        status: "8 900 a'zo",
        time: "Kecha",
        unread: 0,

        messages: [

            {
                type: "incoming",
                text: "JavaScript yangiliklari ⚡",
                time: "Kecha"
            }

        ]
    },


    {
        id: 6,
        name: "Dilnoza Design",
        username: "@dilnoza_design",
        avatar: "DD",
        status: "● Hozir onlayn",
        time: "Kecha",
        unread: 0,

        messages: [

            {
                type: "incoming",
                text: "Portfolio tayyor ✨",
                time: "Kecha"
            }

        ]
    }

];


// ============================================
// ELEMENTS
// ============================================

const chatList =
    document.getElementById("chatList");

const messages =
    document.getElementById("messages");

const search =
    document.getElementById("search");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const emojiPanel =
    document.getElementById("emojiPanel");

const attachBtn =
    document.getElementById("attachBtn");

const fileInput =
    document.getElementById("fileInput");

const infoBtn =
    document.getElementById("infoBtn");

const infoPanel =
    document.getElementById("infoPanel");

const typing =
    document.getElementById("typing");

const floatingMenu =
    document.getElementById("floatingMenu");


// ============================================
// STATE
// ============================================

let activeChat = 1;


// ============================================
// RENDER CHATS
// ============================================

function renderChats(data = chats) {

    chatList.innerHTML = "";


    data.forEach(chat => {

        const item =
            document.createElement("div");


        item.className =
            "chat-item";


        if (chat.id === activeChat) {

            item.classList.add("active");

        }


        item.innerHTML = `

            <div class="avatar">

                ${chat.avatar}

                ${
                    chat.status.includes("onlayn")
                    ? "<i></i>"
                    : ""
                }

            </div>


            <div class="chat-data">

                <div class="chat-top">

                    <span class="chat-name">
                        ${chat.name}
                    </span>

                    <span class="chat-time">
                        ${chat.time}
                    </span>

                </div>


                <div class="chat-bottom">

                    <span class="chat-preview">
                        ${chat.messages.at(-1)?.text || ""}
                    </span>

                    ${
                        chat.unread > 0

                        ? `
                            <span class="badge">
                                ${chat.unread}
                            </span>
                        `

                        : ""
                    }

                </div>

            </div>

        `;


        item.addEventListener(
            "click",
            () => selectChat(chat.id)
        );


        chatList.appendChild(item);

    });

}


// ============================================
// SELECT CHAT
// ============================================

function selectChat(id) {

    activeChat = id;


    const chat =
        chats.find(
            item => item.id === id
        );


    if (!chat) return;


    chat.unread = 0;


    document.getElementById(
        "headerAvatar"
    ).innerHTML =
        `${chat.avatar}<i></i>`;


    document.getElementById(
        "headerName"
    ).innerText =
        chat.name;


    document.getElementById(
        "headerStatus"
    ).innerText =
        chat.status;


    document.getElementById(
        "infoName"
    ).innerText =
        chat.name;


    renderMessages();

    renderChats();

    save();

}


// ============================================
// RENDER MESSAGES
// ============================================

function renderMessages() {

    const chat =
        chats.find(
            item => item.id === activeChat
        );


    if (!chat) return;


    messages.innerHTML = "";


    const day =
        document.createElement("div");


    day.className = "day";

    day.innerText = "BUGUN";


    messages.appendChild(day);


    chat.messages.forEach(message => {

        const item =
            document.createElement("div");


        item.className =
            `message ${message.type}`;


        item.innerHTML = `

            <div class="bubble">

                ${escapeHTML(message.text)}

                <span class="message-time">
                    ${message.time}
                </span>

            </div>

        `;


        messages.appendChild(item);

    });


    scrollToBottom();

}


// ============================================
// SEND MESSAGE
// ============================================

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) return;


    const chat =
        chats.find(
            item => item.id === activeChat
        );


    if (!chat) return;


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "uz-UZ",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    chat.messages.push({

        type: "outgoing",

        text: text,

        time: time

    });


    chat.time = time;


    messageInput.value = "";


    renderMessages();

    renderChats();

    save();


    fakeTyping(chat);

}


// ============================================
// TYPING / AUTO RESPONSE
// ============================================

function fakeTyping(chat) {

    if (chat.id === 3 ||
        chat.id === 5) {

        return;

    }


    typing.classList.add("show");


    setTimeout(() => {

        const responses = [

            "Zo‘r! 🔥",

            "Ha, albatta.",

            "Mayli 😎",

            "Juda yaxshi!",

            "Keyinroq ko‘rib chiqaman.",

            "Tushunarli 🚀",

            "Rahmat! ✨"

        ];


        const reply =
            responses[
                Math.floor(
                    Math.random() *
                    responses.length
                )
            ];


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "uz-UZ",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        chat.messages.push({

            type: "incoming",

            text: reply,

            time: time

        });


        chat.time = time;


        typing.classList.remove("show");


        renderMessages();

        renderChats();

        save();


    }, 1300);

}


// ============================================
// ENTER
// ============================================

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


sendBtn.addEventListener(
    "click",
    sendMessage
);


// ============================================
// SEARCH
// ============================================

search.addEventListener(
    "input",
    () => {

        const value =
            search.value
                .toLowerCase()
                .trim();


        if (!value) {

            renderChats();

            return;

        }


        const filtered =
            chats.filter(chat =>

                chat.name
                    .toLowerCase()
                    .includes(value)

                ||

                chat.username
                    .toLowerCase()
                    .includes(value)

                ||

                chat.messages.some(message =>
                    message.text
                        .toLowerCase()
                        .includes(value)
                )

            );


        renderChats(filtered);

    }
);


// ============================================
// EMOJI
// ============================================

emojiBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        emojiPanel.classList.toggle(
            "show"
        );

    }
);


document
    .querySelectorAll(".emoji-panel button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                messageInput.value +=
                    button.innerText;

                messageInput.focus();

            }
        );

    });


document.addEventListener(
    "click",
    event => {

        if (
            !emojiPanel.contains(event.target) &&
            event.target !== emojiBtn
        ) {

            emojiPanel.classList.remove(
                "show"
            );

        }

    }
);


// ============================================
// ATTACHMENT
// ============================================

attachBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        floatingMenu.classList.toggle(
            "show"
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !floatingMenu.contains(event.target) &&
            event.target !== attachBtn
        ) {

            floatingMenu.classList.remove(
                "show"
            );

        }

    }
);


fileInput.addEventListener(
    "change",
    () => {

        const file =
            fileInput.files[0];


        if (!file) return;


        const chat =
            chats.find(
                item => item.id === activeChat
            );


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "uz-UZ",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        chat.messages.push({

            type: "outgoing",

            text:
                `📎 ${file.name}`,

            time: time

        });


        chat.time = time;


        renderMessages();

        renderChats();

        save();


        fileInput.value = "";

        floatingMenu.classList.remove(
            "show"
        );

    }
);


// ============================================
// MEDIA BUTTONS
// ============================================

document
    .querySelector(".floating-menu button")
    .addEventListener(
        "click",
        () => fileInput.click()
    );


// ============================================
// PROFILE / INFO
// ============================================

infoBtn.addEventListener(
    "click",
    () => {

        infoPanel.classList.toggle(
            "visible"
        );

    }
);


// CSS class orqali ko‘rsatish

const style =
    document.createElement("style");


style.innerHTML = `

    @media (min-width: 1101px) {

        .info-panel {
            display: block;
        }

    }

`;


document.head.appendChild(style);


// ============================================
// CALL
// ============================================

document
    .getElementById("callBtn")
    .addEventListener(
        "click",
        () => {

            alert(
                "📞 Qo‘ng‘iroq boshlanmoqda..."
            );

        }
    );


// ============================================
// VIDEO
// ============================================

document
    .getElementById("videoBtn")
    .addEventListener(
        "click",
        () => {

            alert(
                "🎥 Video qo‘ng‘iroq boshlanmoqda..."
            );

        }
    );


// ============================================
// CHAT SEARCH
// ============================================

document
    .getElementById("chatSearch")
    .addEventListener(
        "click",
        () => {

            const chat =
                chats.find(
                    item => item.id === activeChat
                );


            const query =
                prompt(
                    "Ushbu chatdagi xabarni qidiring:"
                );


            if (!query) return;


            const found =
                chat.messages.filter(
                    message =>
                        message.text
                            .toLowerCase()
                            .includes(
                                query.toLowerCase()
                            )
                );


            alert(
                found.length
                + " ta xabar topildi."
            );

        }
    );


// ============================================
// ESC
// ============================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            emojiPanel.classList.remove(
                "show"
            );

            floatingMenu.classList.remove(
                "show"
            );

        }

    }
);


// ============================================
// LOCAL STORAGE
// ============================================

function save() {

    localStorage.setItem(
        "goldChatData",
        JSON.stringify(chats)
    );

}


function load() {

    const saved =
        localStorage.getItem(
            "goldChatData"
        );


    if (!saved) return;


    try {

        const data =
            JSON.parse(saved);


        data.forEach(savedChat => {

            const current =
                chats.find(
                    item =>
                        item.id === savedChat.id
                );


            if (current) {

                current.messages =
                    savedChat.messages;

                current.time =
                    savedChat.time;

            }

        });

    } catch (error) {

        console.log(
            "Ma'lumotni yuklashda xatolik."
        );

    }

}


// ============================================
// HTML XAVFSIZLIK
// ============================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ============================================
// SCROLL
// ============================================

function scrollToBottom() {

    setTimeout(() => {

        messages.scrollTop =
            messages.scrollHeight;

    }, 50);

}


// ============================================
// START
// ============================================

load();

renderChats();

selectChat(activeChat);