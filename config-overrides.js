const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
}),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            '@layout-body-background': '#0e1314',
            '@background-color-base': '#0e1314',
            '@body-background': '#0e1314',
            '@layout-sider-background': '#171F22',
            '@component-background': '#171F22',
            '@layout-header-background': '#171F22',
            '@menu-dark-submenu-bg': '#171F22',
            '@input-bg': '#171717',
            '@btn-default-bg': '#171717',
            '@border-color-base': 'rgba(0, 0, 0, 0.3)',
            '@border-color-split': 'rgba(0, 0, 0, 0.3)',
            '@heading-color': '#E3E3E3',
            '@text-color': 'rgba(255, 255, 255, 0.8)',
            '@text-color-secondary': 'fade(#fff, 65%)',
            '@table-selected-row-bg': '#3a3a3a',
            '@table-expanded-row-bg': '#3b3b3b',
            '@table-header-bg': '#3a3a3b',
            '@table-row-hover-bg': '#3a3a3b',
            '@layout-trigger-color': 'fade(#fff, 80%)',
            '@layout-trigger-background': '#313232',
            '@alert-message-color': 'fade(#000, 67%)',
            '@disabled-color': 'rgba(255, 255, 255, 0.25)',
            '@tag-default-bg': '#262628',
            '@popover-bg': '#262629',
            '@wait-icon-color': 'fade(#fff, 64%)',
            '@collapse-header-bg': '#262629',
            '@info-color': '#313133',
            '@primary-color': '#006d75'
        },
    }),
);