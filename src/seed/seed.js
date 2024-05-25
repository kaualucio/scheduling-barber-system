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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var PrismaClient = require("@prisma/client").PrismaClient;
var prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var barberShop, barbers, _a, _b, _c, services;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, prisma.barberShop.create({
                        data: {
                            name: 'Barbearia Nova',
                            imutable_id: '1',
                            open_at: '07:00',
                            close_at: '20:00',
                            picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
                            isOpen: false
                        }
                    })];
                case 1:
                    barberShop = _h.sent();
                    _b = (_a = prisma.barber).createMany;
                    _d = {};
                    _e = {
                        name: 'Babeiro 1',
                        email: 'babeiro1@gmail.com'
                    };
                    return [4 /*yield*/, (0, bcryptjs_1.hash)('12345678', 10)];
                case 2:
                    _c = [
                        (_e.password = _h.sent(),
                            _e.phone = '11912345678',
                            _e.picture = 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
                            _e)
                    ];
                    _f = {
                        name: 'Babeiro 2',
                        email: 'babeiro2@gmail.com'
                    };
                    return [4 /*yield*/, (0, bcryptjs_1.hash)('12345678', 10)];
                case 3:
                    _c = _c.concat([
                        (_f.password = _h.sent(),
                            _f.phone = '21987654321',
                            _f.picture = 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
                            _f)
                    ]);
                    _g = {
                        name: 'Babeiro 3',
                        email: 'babeiro3@gmail.com'
                    };
                    return [4 /*yield*/, (0, bcryptjs_1.hash)('12345678', 10)];
                case 4: return [4 /*yield*/, _b.apply(_a, [(_d.data = _c.concat([
                            (_g.password = _h.sent(),
                                _g.phone = '31923456789',
                                _g.picture = 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
                                _g)
                        ]),
                            _d)])];
                case 5:
                    barbers = _h.sent();
                    return [4 /*yield*/, prisma.service.createMany({
                            data: [
                                {
                                    name: 'Corte Navalhado',
                                    price: 35
                                },
                                {
                                    name: 'Corte Social',
                                    price: 25
                                },
                                {
                                    name: 'Barba',
                                    price: 15
                                },
                                {
                                    name: 'Sobrancelha',
                                    price: 10
                                }
                            ]
                        })];
                case 6:
                    services = _h.sent();
                    console.log(barberShop, barbers, services);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
