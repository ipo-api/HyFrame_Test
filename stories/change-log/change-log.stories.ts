import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ChangeLogModule } from './change-log.module';
import { HttpHandler } from '@angular/common/http';

export default {
    title: '版本更新日志',
    decorators: [
        moduleMetadata({
            imports: [CommonModule, ChangeLogModule],
            providers:[HttpHandler]
        }),
    ],
};

export const 更新日志 = () => {
    const changelog = require('../../CHANGELOG.md');
    return {
        template: `
            <app-change-log [changelog]="changelog"></app-change-log>
        `,
        props: {
            changelog
        }
    };
};
更新日志.parameters = {
    viewport: {
        defaultViewport: 'desktop',
    },
};
