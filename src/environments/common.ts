const protocol = 'https';
const apiDomain = 'frontendtest-backend.azurewebsites.net/api';

export const common = {
    sample: `${protocol}://${apiDomain}/Samples`,
    login: `${protocol}://${apiDomain}/Users/Login`,
    getUser: `${protocol}://${apiDomain}/Users/Me`,
    getSamples: `${protocol}://${apiDomain}/Samples`,
    getSamplesId: `${protocol}://${apiDomain}/Samples/##id##`,
    getTestsId: `${protocol}://${apiDomain}/Tests/##id##`,
    getTests: `${protocol}://${apiDomain}/Tests`,
    createTest: `${protocol}://${apiDomain}/Tests`,
    createSample: `${protocol}://${apiDomain}/Samples`,
    deleteTest: `${protocol}://${apiDomain}/Tests/##id##`,
    deleteSample: `${protocol}://${apiDomain}/Samples/##id##`,
    editTest: `${protocol}://${apiDomain}/Tests/##id##`,
    editSample: `${protocol}://${apiDomain}/Samples/##id##`,
}