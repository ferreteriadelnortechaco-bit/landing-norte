import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Truck, 
  PenTool, 
  HardHat, 
  CheckCircle2,
  ArrowRight,
  Instagram,
  Facebook
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Assets
import heroImage from "@assets/generated_images/modern_construction_warehouse_interior_with_yellow_accents.png";
import cementImage from "@assets/generated_images/portland_cement_bag_product_shot.png";
import rebarImage from "@assets/generated_images/steel_rebar_bundle_product_shot.png";
import drillImage from "@assets/generated_images/power_drill_tool_product_shot.png";
import brickImage from "@assets/generated_images/hollow_red_bricks_stack_product_shot.png";
import paintImage from "@assets/generated_images/interior_paint_bucket_product_shot.png";

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  phone: z.string().min(6, "Ingrese un teléfono válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSubmit(values: z.infer<typeof contactSchema>) {
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto con vos a la brevedad.",
    });
    form.reset();
  }

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Construcción", icon: <HardHat className="h-8 w-8" /> },
    { name: "Hierros", icon: <div className="h-8 w-8 font-bold text-2xl leading-none">H</div> }, // Custom icon fallback
    { name: "Herramientas", icon: <PenTool className="h-8 w-8" /> },
    { name: "Pinturas", icon: <div className="h-8 w-8 bg-current rounded-full opacity-50" /> },
    { name: "Electricidad", icon: <div className="h-8 w-8 border-2 border-current rounded-sm" /> },
    { name: "Sanitarios", icon: <div className="h-8 w-8 border-b-4 border-current rounded-b-xl" /> },
  ];

  const offers = [
    { name: "Cemento Portland 50kg", price: "$ Consultar", image: cementImage, tag: "Oferta" },
    { name: "Hierro de Construcción 8mm", price: "$ Consultar", image: rebarImage, tag: "Stock" },
    { name: "Ladrillo Hueco 12x18x33", price: "$ Consultar", image: brickImage, tag: "Pack x100" },
    { name: "Taladro Percutor 13mm", price: "$ Consultar", image: drillImage, tag: "15% OFF" },
    { name: "Látex Interior 20L", price: "$ Consultar", image: paintImage, tag: "Nuevo" },
    { name: "Carretilla Reforzada", price: "$ Consultar", image: heroImage, tag: "Promo" }, // Reusing hero as placeholder for generic
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-bold text-xl rounded">N</div>
            <span className={`text-2xl font-heading font-bold uppercase tracking-tighter ${isScrolled ? "text-secondary" : "text-white drop-shadow-md"}`}>
              NORTE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {["Inicio", "Productos", "Servicios", "Ubicación", "Contacto"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide ${isScrolled ? "text-secondary" : "text-white drop-shadow-sm"}`}
              >
                {item}
              </button>
            ))}
            <Button className="bg-primary text-secondary hover:bg-primary/90 font-bold">
              <Phone className="mr-2 h-4 w-4" /> 3644-XXXXXX
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? "text-secondary" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden border-t"
          >
            {["Inicio", "Productos", "Servicios", "Ubicación", "Contacto"].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left font-medium py-2 border-b border-gray-100 last:border-0"
              >
                {item}
              </button>
            ))}
            <Button className="w-full font-bold">Llamar Ahora</Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Corralón Norte Warehouse" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Sáenz Peña, Chaco</h2>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold uppercase leading-tight mb-6">
              Todo para tu obra <br /> <span className="text-primary">en un solo lugar</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
              Desde los cimientos hasta las terminaciones. Calidad, precio y el mejor asesoramiento.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-secondary hover:bg-primary/90 text-lg px-8 py-6 h-auto font-bold uppercase rounded-none" onClick={() => scrollTo('contacto')}>
                Pedir Presupuesto
              </Button>
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-secondary text-lg px-8 py-6 h-auto uppercase rounded-none font-bold backdrop-blur-sm" onClick={() => scrollTo('ubicación')}>
                <MapPin className="mr-2 h-5 w-5" /> Ver Ubicación
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Strip */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-secondary group cursor-pointer hover:-translate-y-1 transition-transform">
                <div className="bg-secondary/10 p-3 rounded-full group-hover:bg-secondary group-hover:text-primary transition-colors">
                  {cat.icon}
                </div>
                <span className="font-bold uppercase text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <section id="productos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary uppercase mb-4">Ofertas del Mes</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Precios imperdibles en materiales seleccionados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white">
                  <div className="relative h-64 bg-white p-6 flex items-center justify-center">
                    <div className="absolute top-4 right-4 bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase rounded-sm z-10">
                      {offer.tag}
                    </div>
                    <img src={offer.image} alt={offer.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-6 bg-white border-t relative z-20">
                    <h3 className="font-heading font-bold text-xl mb-2 text-secondary">{offer.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-muted-foreground font-medium">{offer.price}</span>
                      <Button variant="ghost" className="text-primary hover:text-primary/80 font-bold p-0 hover:bg-transparent">
                        CONSULTAR <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold uppercase mb-6">¿Por qué elegirnos?</h2>
              <div className="space-y-6">
                {[
                  { title: "Entregas a Domicilio", desc: "Logística propia para llegar a tu obra a tiempo. Cubrimos toda la zona.", icon: Truck },
                  { title: "Atención Personalizada", desc: "Asesoramiento técnico para que compres justo lo que necesitás.", icon: HardHat },
                  { title: "Acopio de Materiales", desc: "Comprá hoy y congelá el precio. Nosotros te lo guardamos.", icon: Clock },
                  { title: "Presupuestos en el Acto", desc: "Envianos tu lista por WhatsApp y recibí tu cotización rápido.", icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-primary/20 p-3 h-fit rounded text-primary">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-primary">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Horarios de Atención</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Lunes a Viernes</span>
                  <span className="font-bold text-primary">07:30 - 12:00 | 16:00 - 20:00</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Sábados</span>
                  <span className="font-bold text-primary">08:00 - 12:30</span>
                </li>
                <li className="flex justify-between text-muted-foreground">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section id="ubicación" className="h-[500px] relative bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14165.250212356543!2d-60.446654!3d-26.790011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94412d0000000001%3A0x0!2sPresidencia%20Roque%20S%C3%A1enz%20Pe%C3%B1a%2C%20Chaco!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "grayscale(1)" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
        <div className="absolute bottom-8 left-4 md:left-12 bg-white p-6 shadow-xl max-w-sm rounded border-l-4 border-primary">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><MapPin className="text-primary" size={20}/> Nuestra Ubicación</h3>
          <p className="text-gray-600 mb-4">Calle Principal 1234, B° Centro<br/>Sáenz Peña, Chaco</p>
          <Button className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold uppercase">
            Cómo Llegar
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-secondary uppercase mb-4">Contactanos</h2>
            <p className="text-muted-foreground">¿Tenés una consulta o necesitás presupuesto? Escribinos.</p>
          </div>

          <Card className="shadow-2xl border-none">
            <CardContent className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono / WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="3644..." className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consulta</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Hola, quisiera saber precio de..." className="bg-gray-50 border-gray-200 min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold uppercase h-12 text-lg">
                    Enviar Mensaje
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="w-10 h-10 bg-primary flex items-center justify-center font-bold text-xl rounded mb-4 text-secondary">N</div>
              <h3 className="font-heading font-bold text-2xl uppercase mb-4">Norte</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tu socio confiable en la construcción. Acompañamos tus proyectos con los mejores materiales y el asesoramiento que necesitás.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase text-primary">Contacto Rápido</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Phone size={16} /> 3644-123456
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <MapPin size={16} /> Sáenz Peña, Chaco
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Clock size={16} /> Lun-Vie: 7:30-12:00 | 16-20
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase text-primary">Redes Sociales</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Corralón Norte. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/5493644xxxxxx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform hover:shadow-xl flex items-center justify-center"
      >
        <Phone className="h-8 w-8 fill-current" />
      </a>
    </div>
  );
}
