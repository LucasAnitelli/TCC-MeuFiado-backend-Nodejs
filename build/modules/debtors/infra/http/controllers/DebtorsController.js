"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Debtor_1 = __importDefault(require("../../typeorm/entities/Debtor"));
var tsyringe_1 = require("tsyringe");
var date_fns_1 = require("date-fns");
var typeorm_1 = require("typeorm");
var CreateDebtorService_1 = __importDefault(require("../../../../../modules/debtors/services/CreateDebtorService"));
var DebtorsController = /** @class */ (function () {
    function DebtorsController() {
    }
    DebtorsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, _a, nameDebtor, date, value, product, parsedDate, createDebtor, debtors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = request.user.id;
                        _a = request.body, nameDebtor = _a.nameDebtor, date = _a.date, value = _a.value, product = _a.product;
                        parsedDate = (0, date_fns_1.parseISO)(date);
                        createDebtor = tsyringe_1.container.resolve(CreateDebtorService_1.default);
                        return [4 /*yield*/, createDebtor.execute({
                                nameDebtor: nameDebtor,
                                date: parsedDate,
                                value: value,
                                product: product,
                                user_id: user_id,
                            })];
                    case 1:
                        debtors = _b.sent();
                        return [2 /*return*/, response.json(debtors)];
                }
            });
        });
    };
    DebtorsController.prototype.listFilter = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, debtorsRepository, debtors, newDebtors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = request.user.id;
                        debtorsRepository = (0, typeorm_1.getRepository)(Debtor_1.default);
                        debtors = debtorsRepository
                            .createQueryBuilder('debtors')
                            .where('debtors.user_id in (:user_id)', { user_id: user_id })
                            .andWhere("debtors.nameDebtor like :filter", { filter: "%".concat(request.query.filter, "%") })
                            .orderBy("debtors.nameDebtor", 'ASC');
                        return [4 /*yield*/, debtors.getMany()];
                    case 1:
                        newDebtors = _a.sent();
                        if (newDebtors.length && !!request.query.filter) {
                            return [2 /*return*/, response.json({
                                    Data: newDebtors,
                                    Success: true,
                                })];
                        }
                        return [2 /*return*/, response.status(404).json({
                                Status: "error",
                                Message: "Devedor não encontrado",
                                Data: {},
                                Success: false,
                            })];
                }
            });
        });
    };
    DebtorsController.prototype.listPagination = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, debtorsRepository, page, perPage, offset, debtors, TotalDebtors, list, TotalPages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = request.user.id;
                        debtorsRepository = (0, typeorm_1.getRepository)(Debtor_1.default);
                        page = parseInt(request.query.page) || 1;
                        perPage = parseInt(request.query.perPage) || 20;
                        offset = 0;
                        offset = (page * perPage) - perPage;
                        debtors = debtorsRepository
                            .createQueryBuilder('debtors')
                            .where('debtors.user_id in (:user_id)', { user_id: user_id })
                            .orderBy('debtors.date', 'DESC')
                            .offset(offset)
                            .limit(perPage);
                        return [4 /*yield*/, debtors.getCount()];
                    case 1:
                        TotalDebtors = _a.sent();
                        return [4 /*yield*/, debtors.getMany()];
                    case 2:
                        list = _a.sent();
                        TotalPages = Math.ceil(TotalDebtors / perPage);
                        if (!!request.query.page && request.query.perPage) {
                            return [2 /*return*/, response.json({
                                    Data: list,
                                    TotalDebtors: TotalDebtors,
                                    TotalPages: TotalPages,
                                    Success: true,
                                })];
                        }
                        return [2 /*return*/, response.status(404).json({
                                Status: "error",
                                Message: "Ocorreu um erro na hora de listar os devedores",
                                Data: {},
                                Success: false,
                            })];
                }
            });
        });
    };
    DebtorsController.prototype.put = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, debtorsRepository, debtors, debtorsUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        debtorsRepository = (0, typeorm_1.getRepository)(Debtor_1.default);
                        return [4 /*yield*/, debtorsRepository.update(id, request.body)];
                    case 1:
                        debtors = _a.sent();
                        if (!(debtors.affected === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, debtorsRepository.findOne(id)];
                    case 2:
                        debtorsUpdate = _a.sent();
                        return [2 /*return*/, response.json({
                                Data: debtorsUpdate,
                                Success: true
                            })];
                    case 3: return [2 /*return*/, response.status(404).json({
                            Status: "error",
                            Message: "Não foi possível encontrar este devedor",
                            Data: {},
                            Success: false,
                        })];
                }
            });
        });
    };
    DebtorsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, debtorsRepository, debtors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        debtorsRepository = (0, typeorm_1.getRepository)(Debtor_1.default);
                        return [4 /*yield*/, debtorsRepository.delete(id)];
                    case 1:
                        debtors = _a.sent();
                        if (!(debtors.affected === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, debtorsRepository.findOne(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json({
                                Data: {},
                                Success: true
                            })];
                    case 3: return [2 /*return*/, response.status(404).json({
                            Status: "error",
                            Message: "Não foi possível encontrar este devedor",
                            Data: {},
                            Success: false,
                        })];
                }
            });
        });
    };
    return DebtorsController;
}());
exports.default = DebtorsController;
