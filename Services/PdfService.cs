using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using lpnu.Data;
using lpnu.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class PdfService : IPdfService
    {
        private readonly IConverter _converter;
        private readonly IUserService _userService;
        private readonly EFContext _context;
        
        public PdfService(IConverter converter, EFContext context, IUserService userService)
        {
            _converter = converter;
            _context = context;
            _userService = userService;
        }
        
        public async Task<byte[]> CreatePdf(string userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == userId);
            var userStats = await _userService.GetUserStatsAsync(userId);
            
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report"
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = {
                    new ObjectSettings {
                        PagesCount = true,
                        HtmlContent = $"<head><title>Дані студента</title></head>" +
                                                    $"<body><div style=\"height: 800px; background-color: white; font-size: 36px;\">" +
                                                    $"<h1>ПІП: {user.UserName}</h1>" +
                                                    $"<hr>" +
                                                    $"<h5>Середній бал: {userStats.AverageMark}</h5>" +
                                                    $"<h5>Електронна пошта: {user.Email}</h5>" +
                                                    $"<h5>Дата створення документу: {DateTime.Now}</h5>" +
                                                    $"</div>" +
                                                    $"</body>",
                                                    
                        WebSettings = { DefaultEncoding = "utf-8" },
                        HeaderSettings = { FontSize = 9, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 }
                    }
                }
            };
            
            return _converter.Convert(pdf);
        }
    }
}