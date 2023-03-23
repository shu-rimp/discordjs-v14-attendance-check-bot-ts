const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" }
const date = new Date()
const today = date.toLocaleDateString('ko-KR', options).replace(/\./g, '').replace(/\s/g, '-')
const currentDate = date.getDate()

let previousMonth = date.getMonth()
if (previousMonth == 0) previousMonth += 12

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

export const SetupContent = {
    reply: '```출석부 세팅을 시작합니다.\n아래 채널 리스트에서 출석부를 보낼 채널을 선택해주세요.\n/셋업 명령어는 서버 당 1회만 사용할 수 있습니다.```',
    replyComplete: '```출석부 셋업을 완료했어요!```',
    replyAlreadyExists: '출석부가 이미 존재해요!\n다른 채널에 셋업을 원하시면 봇을 내보내고 다시 초대 해주세요.'
}

export const EmbedConfig = {
    color: '#5B65EA',
    colorOverview: '#ffc012',
    title: `📒 ${today} 출석부`,
    titleOverview: `🥇 ${previousMonth}월 출석왕`,
    thumbnailPath: `src/img/calendar-date-${currentDate}.png`,
    thumbnail: `attachment://calendar-date-${currentDate}.png`,
    thumbnailOverviewPath: 'src/img/1103-confetti-flat.gif',
    thumbnailOverview: 'attachment://1103-confetti-flat.gif',
    description: '스터디 참여 시 출석체크 해주세요.\n매월 말일 자정에 `🥇출석왕`을 선발합니다.\n오늘 하루도 고생 많으셨습니다!💜',
    descriptionOverview: '이번 달 참여를 가장 많이 한 분이에요! 모두 축하해주세요🥳',
    footer: '출석버튼은 00시에 비활성화 됩니다.'
}