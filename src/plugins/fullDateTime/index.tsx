/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "FullDateTimePlugin",
    description: "Show full time for messages in 24-hour format",
    authors: [Devs.Nobody],

    patches: [
        {
            find: ".Messages.MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL",
            replacement: [{
                match: /(\(d,\s*"LT")/,
                replace: "(d, 'HH:mm:ss'"
            },
            {
                match: /(\(d,\s*"LLLL")/,
                replace: "(d, 'YYYY-MM-DD HH:mm:ss'"
            }]
        }
    ]
},
);
