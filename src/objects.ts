const today = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
const currentMonth = new Date().getMonth() + 1
const currentDate = new Date().getDate()

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
    color: '#5B65EA',
    colorOverview: '#ffc012',
    title: `📒 ${today} 출석부`,
    titleOverview: `🥇 ${currentMonth}월 출석왕`,
    thumbnailPath: `src/img/calendar-date-${currentDate}.png`,
    thumbnail: `attachment://calendar-date-${currentDate}.png`,
    thumbnailOverviewPath: 'src/img/1103-confetti-flat.gif',
    thumbnailOverview: 'attachment://1103-confetti-flat.gif',
    description: '스터디 참여 시 출석체크 해주세요.\n매월 말일 자정에 `🥇출석왕`을 선발합니다.\n오늘 하루도 고생 많으셨습니다!💜',
    descriptionOverview: '이번 달 출석을 가장 많이 한 분이에요! 모두 축하해주세요🥳',
    footer: '출석버튼은 00시에 비활성화 됩니다.'
}