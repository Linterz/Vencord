/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const enum Methods {
    twelveHour,
    twentyFourHour,
}

const settings = definePluginSettings({
    method: {
        description: "Time format",
        type: OptionType.SELECT,
        options: [
            { label: "12 hour", value: Methods.twelveHour, default: true },
            { label: "24 hour", value: Methods.twentyFourHour },
        ],
    },
});

export default definePlugin({
    name: "FullDateTimePlugin",
    description: "Show full time for messages in 24-hour format",
    authors: [Devs.Nobody],
    settings,

    patches: [
        {
            find: ".Messages.MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL",
            replacement: [{
                match: /(\(d,\s*"LT")/,
                replace: (_, orig) => `(d, "${format()}"`
            },
            {
                match: /(\(d,\s*"LLLL")/,
                replace: (_, orig) => `(d, "YYYY-MM-DD ${format()}"`,
            }]
        },
    ],
},
);

function format() {
    switch (settings.store.method) {
        case Methods.twelveHour:
            return "h:mm:ss A";
        case Methods.twentyFourHour:
            return "HH:mm:ss";
    }
}
