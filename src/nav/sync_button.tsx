import * as React from "react";
import { SyncStatus } from "farmbot/dist";
import { NavButtonProps } from "./interfaces";
import { sync } from "../devices/actions";

const COLOR_MAPPING: Partial<Record<SyncStatus, string>> = {
  "synced": "green",
  "sync_now": "yellow",
  "syncing": "yellow",
  "sync_error": "red",
  "locked": "red",
  "unknown": "red"
};

const TEXT_MAPPING: Partial<Record<SyncStatus, string>> = {
  "synced": "SYNCED",
  "sync_now": "SYNC NOW",
  "syncing": "SYNCING",
  "sync_error": "SYNC ERROR",
  "locked": "LOCKED",
  "unknown": "DISCONNECTED"
};

export function SyncButton({ auth, bot, dispatch }: NavButtonProps) {
  if (!auth) {
    return <span></span>;
  }
  let { sync_status } = bot.hardware.informational_settings;
  sync_status = sync_status || "unknown";
  let color = COLOR_MAPPING[sync_status] || "red";
  let text = TEXT_MAPPING[sync_status] || "DISCONNECTED";
  return <button className={`nav-sync ${color}`}
    onClick={() => { dispatch(sync()); }}>
    {text}
  </button>;
};
