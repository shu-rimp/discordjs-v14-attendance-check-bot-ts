const today = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');

export const ButtonCustomId = {
    Attend: 'attend'
}

export const CommandName = {
    Ping: 'ping',
    Attend: '출첵',
    Intro: '사용방법',
    Setup: '셋업'
}

export const CommandDescription = {
    Ping: 'Replies with Pong!',
    Attend: '출첵메시지를 보내요',
    Intro: '사용방법을 알려줘요',
    Setup: '출석부를 세팅해요'
}

export const PingContent = {
    reply: 'Pong!'
}

export const AttendContent = {
    reply: '@here 출석체크 알리미',
    replyAlreadyExists: '오늘은 이미 출석했어요!'
}

export const IntroContent = {

}

export const EmbedConfig = {
    color: '#2B2D31',
    colorTopUser: '',
    title: `📒 ${today} 출석부`,
    titleTopUser: ``,
    description: '스터디에 참여하실 분은 출석체크 해주세요! \n매월 말일 자정에 `🥇출석왕`을 선발합니다. \n 오늘 하루도 고생 많으셨습니다💜 \n',
    descriptionTopUser: ''
}