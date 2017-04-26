import * as React from "react";
import { BotProp } from "../interfaces";
import { t } from "i18next";
import { ToggleButton } from "../../controls/toggle_button";
import {
  checkControllerUpdates,
  updateConfig
} from "../actions";

export let OsUpdateButton = ({ bot }: BotProp) => {
  let osUpdateBool = bot.hardware.configuration.os_auto_update;
  let buttonStr = "Can't Connect to bot";
  let buttonColor = "yellow";
  if (bot.currentOSVersion != undefined) {
    if (bot.currentOSVersion ===
      bot.hardware.informational_settings.controller_version) {
      buttonStr = t("UP TO DATE");
      buttonColor = "gray";
    } else {
      buttonStr = t("UPDATE");
      buttonColor = "green";
    }
  } else {
    buttonStr = "Can't Connect to release server";
  }
  return <div className="updates">
    <p>
      {t("Auto Updates?")}
    </p>
    <ToggleButton toggleval={"" + (osUpdateBool || "undefined")}
      toggleAction={() => {
        let os_auto_update = !osUpdateBool ? 1 : 0;
        updateConfig({ os_auto_update })(() => { });
      }} />
    <button className={buttonColor} onClick={() => checkControllerUpdates()}>
      {buttonStr}
    </button>
  </div>;
};
