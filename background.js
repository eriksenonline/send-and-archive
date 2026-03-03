async function sendAndArchiveFromTab(tab) {
  if (!tab || tab.type !== "messageCompose") {
    return;
  }

  const composeDetails = await browser.compose.getComposeDetails(tab.id);
  const relatedMessageId = composeDetails.relatedMessageId ?? null;

  await browser.compose.sendMessage(tab.id, {
    mode: "sendNow"
  });

  if (relatedMessageId) {
    await browser.messages.archive([relatedMessageId]);
  }
}

async function runSendAndArchiveForActiveComposeTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  await sendAndArchiveFromTab(tab);
}

browser.composeAction.onClicked.addListener((tab) => {
  sendAndArchiveFromTab(tab).catch((error) => {
    console.error("Send & Archive failed", error);
  });
});

browser.commands.onCommand.addListener((command) => {
  if (command !== "send-and-archive") {
    return;
  }

  runSendAndArchiveForActiveComposeTab().catch((error) => {
    console.error("Send & Archive command failed", error);
  });
});
